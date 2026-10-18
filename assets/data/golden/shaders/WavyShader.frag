#pragma header

uniform float iTime;  // THE TIME.

uniform float uSpeed;  // How fast the waves move over time
uniform float uFrequency;  // Number of waves over time
uniform float uWaveAmplitude;  // How much the pixels are going to stretch over the waves
uniform vec4 frameUv;
uniform vec2 frameSize;

uniform bool wrap;

float wrapMe(float value, float _min, float _max) {
	if (value < _min)
		return value + _max;
	else if (value > _max)
		return value - _max;
	return value;
}

void main() {
    float speed      = uSpeed         * 1.0;
    float frequency  = uFrequency     * 3.0;
    float wamplitude = uWaveAmplitude * 0.4;
    
    vec2 uv = (openfl_TextureCoordv - frameUv.xy) / (frameUv.zw - frameUv.xy);
    
    float offsetY = sin(uv.y * frequency - iTime * speed) * (wamplitude);
    float offsetX = sin(uv.x * frequency + iTime * speed) * (wamplitude);
    uv.x += (offsetX + (offsetY * sin(iTime * uSpeed) * 1.2));
    uv.y += (offsetY + (offsetX * cos(iTime * uSpeed) * 1.5));
    
	if (wrap) {
		uv.x = wrapMe(uv.x, 0.0, 1.0);
		uv.y = wrapMe(uv.y, 0.0, 1.0);
	} else {
		uv.x = clamp(uv.x, 0.0, 1.0);
		uv.y = clamp(uv.y, 0.0, 1.0);
	}
    
    uv = (uv * (frameUv.zw - frameUv.xy)) + frameUv.xy;
    
    gl_FragColor = flixel_texture2D(bitmap, uv);
}