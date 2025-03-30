document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('splash-cursor');
    if (!canvas) return;
    
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
        console.error('WebGL not supported');
        return;
    }
    
    // Configuration
    const config = {
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 512, // Reduced from 1440 to avoid exceeding max texture size
        DENSITY_DISSIPATION: 3.5,
        VELOCITY_DISSIPATION: 2,
        PRESSURE: 0.1,
        PRESSURE_ITERATIONS: 20,
        CURL: 3,
        SPLAT_RADIUS: 0.2,
        SPLAT_FORCE: 6000,
        SHADING: true,
        COLOR_UPDATE_SPEED: 10,
        PAUSED: false,
        BACK_COLOR: { r: 0, g: 0, b: 0 },
        TRANSPARENT: true
    };
    
    // Resize canvas to fill window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Shader sources
    const baseVertexShader = `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;
        void main() {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
    `;
    
    const displayShaderSource = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uTexture;
        uniform vec2 texelSize;
        
        vec3 linearToGamma(vec3 color) {
            color = max(color, vec3(0));
            return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
        }
        
        void main() {
            vec3 c = texture2D(uTexture, vUv).rgb;
            
            #ifdef SHADING
                vec3 lc = texture2D(uTexture, vL).rgb;
                vec3 rc = texture2D(uTexture, vR).rgb;
                vec3 tc = texture2D(uTexture, vT).rgb;
                vec3 bc = texture2D(uTexture, vB).rgb;
                float dx = length(rc) - length(lc);
                float dy = length(tc) - length(bc);
                vec3 n = normalize(vec3(dx, dy, length(texelSize)));
                vec3 l = vec3(0.0, 0.0, 1.0);
                float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
                c *= diffuse;
            #endif
            
            float a = max(c.r, max(c.g, c.b));
            gl_FragColor = vec4(c, a);
        }
    `;
    
    const splatShader = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;
        
        void main() {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
    `;
    
    // Compile shader
    function compileShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        
        return shader;
    }
    
    // Create program
    function createProgram(vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }
        
        return program;
    }
    
    // Get uniforms
    function getUniforms(program) {
        const uniforms = {};
        const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        
        for (let i = 0; i < uniformCount; i++) {
            const uniformName = gl.getActiveUniform(program, i).name;
            uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
        }
        
        return uniforms;
    }
    
    // Get max texture size
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    
    // Create framebuffer
    function createFBO(w, h, internalFormat, format, type, param) {
        // Ensure width and height are valid
        w = Math.min(w, maxTextureSize);
        h = Math.min(h, maxTextureSize);
        
        // Ensure width and height are at least 1
        w = Math.max(1, w);
        h = Math.max(1, h);
        
        gl.activeTexture(gl.TEXTURE0);
        
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
        
        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        
        // Check framebuffer status
        const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (status !== gl.FRAMEBUFFER_COMPLETE) {
            console.error('Framebuffer not complete:', status);
        }
        
        gl.viewport(0, 0, w, h);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        return {
            texture,
            fbo,
            width: w,
            height: h,
            texelSizeX: 1.0 / w,
            texelSizeY: 1.0 / h,
            attach(id) {
                gl.activeTexture(gl.TEXTURE0 + id);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                return id;
            }
        };
    }
    
    // Create double FBO
    function createDoubleFBO(w, h, internalFormat, format, type, param) {
        let fbo1 = createFBO(w, h, internalFormat, format, type, param);
        let fbo2 = createFBO(w, h, internalFormat, format, type, param);
        
        return {
            width: w,
            height: h,
            texelSizeX: fbo1.texelSizeX,
            texelSizeY: fbo1.texelSizeY,
            get read() {
                return fbo1;
            },
            set read(value) {
                fbo1 = value;
            },
            get write() {
                return fbo2;
            },
            set write(value) {
                fbo2 = value;
            },
            swap() {
                const temp = fbo1;
                fbo1 = fbo2;
                fbo2 = temp;
            }
        };
    }
    
    // Compile shaders
    const vertexShader = compileShader(gl.VERTEX_SHADER, baseVertexShader);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, displayShaderSource);
    const splatFragmentShader = compileShader(gl.FRAGMENT_SHADER, splatShader);
    
    // Create programs
    const displayProgram = createProgram(vertexShader, fragmentShader);
    const splatProgram = createProgram(vertexShader, splatFragmentShader);
    
    // Get uniforms
    const displayUniforms = getUniforms(displayProgram);
    const splatUniforms = getUniforms(splatProgram);
    
    // Create buffers
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    
    // Set up vertex attributes
    const aPosition = gl.getAttribLocation(displayProgram, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    
    // Create FBOs
    let dyeWidth = Math.min(Math.round(canvas.width * config.DYE_RESOLUTION / 1000), maxTextureSize);
    let dyeHeight = Math.min(Math.round(canvas.height * config.DYE_RESOLUTION / 1000), maxTextureSize);
    
    // Ensure dimensions are at least 1
    dyeWidth = Math.max(1, dyeWidth);
    dyeHeight = Math.max(1, dyeHeight);
    
    console.log('Creating dye FBO with dimensions:', dyeWidth, dyeHeight);
    
    let dye = createDoubleFBO(dyeWidth, dyeHeight, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR);
    
    // Mouse tracking
    let pointer = {
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
        moved: false,
        down: false
    };
    
    canvas.addEventListener('mousemove', (e) => {
        pointer.moved = true;
        pointer.x = e.clientX;
        pointer.y = e.clientY;
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        pointer.moved = true;
        pointer.x = e.touches[0].clientX;
        pointer.y = e.touches[0].clientY;
    });
    
    canvas.addEventListener('mousedown', () => {
        pointer.down = true;
    });
    
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        pointer.down = true;
        pointer.x = e.touches[0].clientX;
        pointer.y = e.touches[0].clientY;
    });
    
    window.addEventListener('mouseup', () => {
        pointer.down = false;
    });
    
    window.addEventListener('touchend', () => {
        pointer.down = false;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        
        // Recreate FBOs with new dimensions
        dyeWidth = Math.min(Math.round(canvas.width * config.DYE_RESOLUTION / 1000), maxTextureSize);
        dyeHeight = Math.min(Math.round(canvas.height * config.DYE_RESOLUTION / 1000), maxTextureSize);
        
        // Ensure dimensions are at least 1
        dyeWidth = Math.max(1, dyeWidth);
        dyeHeight = Math.max(1, dyeHeight);
        
        console.log('Resizing dye FBO to:', dyeWidth, dyeHeight);
        
        dye = createDoubleFBO(dyeWidth, dyeHeight, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR);
    });
    
    // Generate random color
    function generateColor() {
        const h = Math.random();
        const s = 1.0;
        const v = 1.0;
        
        let r, g, b;
        
        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);
        
        switch (i % 6) {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
        }
        
        return { r, g, b };
    }
    
    // Splat function
    function splat(x, y) {
        gl.useProgram(splatProgram); // Use splatProgram unconditionally
        gl.viewport(0, 0, dye.width, dye.height);
        
        gl.uniform1i(splatUniforms.uTarget, dye.read.attach(0));
        gl.uniform1f(splatUniforms.aspectRatio, canvas.width / canvas.height);
        gl.uniform2f(splatUniforms.point, x / canvas.width, 1.0 - y / canvas.height);
        gl.uniform3f(splatUniforms.color, ...Object.values(generateColor()));
        gl.uniform1f(splatUniforms.radius, config.SPLAT_RADIUS);
        
        gl.bindFramebuffer(gl.FRAMEBUFFER, dye.write.fbo);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        dye.swap();
    }
    
    // Render function
    function render() {
        gl.useProgram(displayProgram); // Use displayProgram unconditionally
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform1i(displayUniforms.uTexture, dye.read.attach(0));
        gl.uniform2f(displayUniforms.texelSize, 1.0 / canvas.width, 1.0 / canvas.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }
    
    // Animation loop
    let lastTime = Date.now();
    let lastX = 0;
    let lastY = 0;
    
    function update() {
        const now = Date.now();
        const dt = Math.min((now - lastTime) / 1000, 0.016);
        lastTime = now;
        
        if (pointer.moved) {
            pointer.moved = false;
            
            const dx = pointer.x - lastX;
            const dy = pointer.y - lastY;
            
            if (dx !== 0 || dy !== 0) {
                splat(pointer.x, pointer.y);
            }
            
            lastX = pointer.x;
            lastY = pointer.y;
        }
        
        render();
        requestAnimationFrame(update);
    }
    
    // Start animation
    update();
});