'use strict';
let pr = s => console.log(s);

function setupCanvas(canvas, shader, width, height) {
    const ires_loc = gl.getUniformLocation(shader, 'iResolution');
    gl.uniform2fv(ires_loc, [width, height]);

    gl.viewport(0,0, width,height);
    canvas.style = `width:${width}px;height:${height}px;image-rendering:pixelated;`;
    canvas.width = width;
    canvas.height = height;
}
const fs = `
precision mediump float;

uniform float iTime;
uniform vec2 iResolution;

void main() {
  //float time = iTime * 1.0;

  //vec2 uv = (gl_FragCoord.xy / iResolution.xx - 0.5) * 8.0;

    gl_FragColor = vec4( 1.0,1.0,.0, 1.0 );

}
`;

function main() {
    const width = 800, height = 800;

    const shader = simpleShader(quad_vshader, document.getElementById('fragment-shader').textContent);
    gl.useProgram(shader);

    const quad_buffer = gl.createBuffer(),
          vpos_loc = gl.getAttribLocation(shader, 'vpos');

    gl.bindBuffer(gl.ARRAY_BUFFER, quad_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    gl.vertexAttribPointer(vpos_loc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vpos_loc);

    //let tex0_loc = gl.getUniformLocation(shader, 'data');
    //gl.uniform1i(tex0_loc, 0);

    setupCanvas(canvas, shader, width, height);

    let time_loc = gl.getUniformLocation(shader, 'iTime');

    function render(time) {
        window.requestAnimationFrame(render);

        //gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniform1f(time_loc, time/1000);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, quad.length/2);

        //gl.readPixels(0, 0, width, height, gl.RGBA8, gl.UNSIGNED_BYTE, output);
        //gl.copyTexSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 0, 0, width, height, 0);

        //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        //gl.clear(gl.COLOR_BUFFER_BIT);
        //gl.drawArrays(gl.TRIANGLE_FAN, 0, quad.length/2);
    }
    render();
}

main();

