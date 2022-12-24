(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const c=i=>new Promise((r,n)=>{const t=document.createElement("script");t.innerHTML=i.innerHTML;const e=i.getAttribute("src");e&&t.setAttribute("src",e),t.onload=()=>r(),t.onerror=o=>n(),document.head.appendChild(t),document.head.removeChild(t),e||r()});document.querySelector("head").innerHTML=`
    ${document.querySelector("head").innerHTML}
    <link rel="stylesheet" href="./style.css" />
`;document.querySelector("#app").innerHTML=`
<audio id="audio" autoplay="autoplay" loop>
      <source src="./ddd.mp3" type="audio/mp3" />
</audio>
<header>
  <h1><small>\u6DD1\u5973\u7684</small><span style="padding: 0 0.34rem;">\u5927\u5B9D</span><small>\u5E73\u5B89\u591C</small><span style="padding: 0 0.34rem;">\u5FEB\u4E50</span></h1>

</header>

<footer>
  \u219C<span style="padding: 0 0.34rem;">\u62D6\u52A8\u5730\u7403\u4EEA\u6765\u79FB\u52A8\u96EA\u6676\u7403\u5427</span>\u219D
</footer>
<p>\u573A\u666F\u6B63\u5728\u8FDB\u5165...</p>
<canvas class="webgl"></canvas>
<script src="./three.min.js"><\/script>
<script src="./GLTFLoader.js"><\/script>
<script src="./DRACOLoader.js"><\/script>
<script src="./OrbitControls.js"><\/script>
<script src="./MeshSurfaceSampler.js"><\/script>
<script type="x-shader/x-fragment" id="fragmentShaderSnow">
  uniform float uTime;
  uniform float uR;
  uniform float uG;
  uniform float uB;
  varying vec2 vUv;
  varying float vRandom;
  
  void main() {
    vec2 uv = vUv;
    vec3 color = vec3(1.0);
    vec3 color1 = vec3(uR / 255., uG / 255., uB / 255.);
  
    float random = vRandom;
    float strength = distance(uv, vec2(0.5));
    strength *= 2.0;
    strength = 1.0 - strength;
    if (strength < 0.5 ) discard;
    //strength = 1.0;
    float alpha = step(0.5, fract(((uTime*10.0 + 10.) * random + (random - .5) * 2.0) * 0.5));
    color = alpha == 1.0 ? color : color1;
    gl_FragColor = vec4(color * strength, 1.0);
  }
  
<\/script>
<script type="x-shader/x-vertex" id="vertexShaderSnow">
  #define M_PI 3.1415926535897932384626433832795
  uniform float uR;
  uniform float uG;
  uniform float uB;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uSize;
  uniform float actionTime;
  uniform float previousActionTime;
  attribute float aScale;
  attribute float random;
  attribute float random1;
  attribute float aRadius;
  attribute float aPhi;
  attribute float aTheta;
  attribute float radius;
  attribute float angleEnd;
  attribute float radiusEnd;
  attribute float phiEnd;
  attribute vec3 aOffset;
  varying float vRandom;


  float timeFunction(float t, float r, float r1) {
    float tt = (t*.1 - pow(r, 3.0))*(r1);
    tt = clamp( 0.0, tt, 1.0);
    tt = 1.0 - pow(1.0 - tt, 2.0);
    tt *= 3.14159265359;
    return tt;
  }

  void main() {

  float t = uTime;
  t = timeFunction(uTime - previousActionTime, random, random1) < 3.14159265359 && abs(phiEnd - aPhi) > .2? timeFunction(uTime - previousActionTime, random, random1) : timeFunction(uTime - actionTime, random, random1);
  vec3 initial = .96 * aRadius * vec3(sin(aTheta)*sin(aPhi), cos(aPhi), cos(aTheta) * sin(aPhi));


  float r = .96* (1.0 - pow(1.0 - radiusEnd, 1.0));
  float p = aPhi + phiEnd - 0.5 * M_PI;
  vec3 end = .96 * r *vec3(sin(aTheta + angleEnd)*sin(p), cos(p), cos(aTheta + angleEnd)*sin(p));
  vec3 np =  initial + (end - initial) * vec3(sin(t), sin(t), sin(t));
  vec4 modelPosition = modelMatrix * vec4(np, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;

  viewPosition.xyz += (position) * aScale * aScale * aScale * uSize;
  viewPosition.y += .25 * uSize * aScale * aScale * aScale * .96;
  gl_Position = projectionMatrix * viewPosition;
  vUv = uv;
  vRandom = random;
  }
<\/script>
<script src="./script.js"><\/script>
`;window.addEventListener("load",function(){const i=document.querySelector("#audio"),r=(t,e)=>{t.addEventListener(e,function(){i.paused&&i.play()})};r(document.body,"click"),r(document.body,"touch"),r(document.querySelector(".webgl"),"click"),r(document.querySelector(".webgl"),"touch"),[...document.querySelector("#app").querySelectorAll("script")].filter(t=>!t.id).reduce((t,e)=>t.then(()=>c(e)),Promise.resolve())});
