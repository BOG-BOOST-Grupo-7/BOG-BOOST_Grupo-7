import React from 'react';
import './MapaMercadoSVG.css';

const MapaMercadoSVG = () => {
  return (
    <div className="contenedor-mapa-svg">
      <svg 
        width="1300" 
        height="900" 
        viewBox="0 0 1300 900"
        className="mapa-svg"
      >
        {/* Estilos */}
        <style>{`
          .puesto { cursor: pointer; transition: fill 0.2s; }
          .puesto:hover rect { fill: #F39C12; }
          .texto-p { 
            font-size: 11px; 
            font-family: Arial, sans-serif; 
            text-anchor: middle; 
            dominant-baseline: middle;
            fill: #000;
            pointer-events: none;
          }
          .puesto rect { 
            fill: #fff; 
            stroke: #666; 
            stroke-width: 1;
          }
          .puesto-negro { fill: #000; }
        `}</style>

        {/* === TU CÓDIGO DE PUESTOS AQUÍ === */}
        
// Column 47 to 51 
<g class="puesto" id="p-47"><rect x="640" y="175" width="25" height="25"/><text x="652.5" y="187.5" class="texto-p">47</text></g>
<g class="puesto" id="p-48"><rect x="640" y="200" width="25" height="25"/><text x="652.5" y="212.5" class="texto-p">48</text></g>
<g class="puesto" id="p-49"><rect x="640" y="225" width="25" height="25"/><text x="652.5" y="237.5" class="texto-p">49</text></g>
<g class="puesto" id="p-50"><rect x="640" y="250" width="25" height="25"/><text x="652.5" y="262.5" class="texto-p">50</text></g>
<g class="puesto" id="p-51"><rect x="640" y="275" width="25" height="25"/><text x="652.5" y="287.5" class="texto-p">51</text></g>
<g class="puesto" id="p-52"><rect x="640" y="300" width="25" height="25"/><text x="652.5" y="312.5" class="texto-p">52</text></g>

// Row 53 to 65 
<g class="puesto" id="p-53"><rect x="615" y="300" width="25" height="25"/><text x="627.5" y="312.5" class="texto-p">53</text></g>
<g class="puesto" id="p-54"><rect x="590" y="300" width="25" height="25"/><text x="602.5" y="312.5" class="texto-p">54</text></g>
<g class="puesto" id="p-55"><rect x="565" y="300" width="25" height="25"/><text x="577.5" y="312.5" class="texto-p">55</text></g>
<g class="puesto" id="p-56"><rect x="540" y="300" width="25" height="25"/><text x="552.5" y="312.5" class="texto-p">56</text></g>
<g class="puesto" id="p-57"><rect x="515" y="300" width="25" height="25"/><text x="527.5" y="312.5" class="texto-p">57</text></g>
<g class="puesto" id="p-58"><rect x="490" y="300" width="25" height="25"/><text x="502.5" y="312.5" class="texto-p">58</text></g>
<g class="puesto" id="p-59"><rect x="465" y="300" width="25" height="25"/><text x="477.5" y="312.5" class="texto-p">59</text></g>
<g class="puesto" id="p-60"><rect x="440" y="300" width="25" height="25"/><text x="452.5" y="312.5" class="texto-p">60</text></g>
<g class="puesto" id="p-61"><rect x="415" y="300" width="25" height="25"/><text x="427.5" y="312.5" class="texto-p">61</text></g>
<g class="puesto" id="p-62"><rect x="390" y="300" width="25" height="25"/><text x="402.5" y="312.5" class="texto-p">62</text></g>
<g class="puesto" id="p-63"><rect x="365" y="300" width="25" height="25"/><text x="377.5" y="312.5" class="texto-p">63</text></g>
<g class="puesto" id="p-64"><rect x="340" y="300" width="25" height="25"/><text x="352.5" y="312.5" class="texto-p">64</text></g>
<g class="puesto" id="p-65"><rect x="315" y="300" width="25" height="25"/><text x="327.5" y="312.5" class="texto-p">65</text></g>

// Column 66 to 67 & 88-89, 115, 138, 141 
<g class="puesto" id="p-66"><rect x="315" y="325" width="25" height="25"/><text x="327.5" y="337.5" class="texto-p">66</text></g>
<g class="puesto" id="p-67"><rect x="315" y="350" width="25" height="25"/><text x="327.5" y="362.5" class="texto-p">67</text></g>
<g class="puesto" id="p-88"><rect x="315" y="375" width="25" height="25"/><text x="327.5" y="387.5" class="texto-p">88</text></g>
<g class="puesto" id="p-89"><rect x="315" y="400" width="25" height="25"/><text x="327.5" y="412.5" class="texto-p">89</text></g>
<g class="puesto" id="p-115"><rect x="315" y="475" width="25" height="25"/><text x="327.5" y="487.5" class="texto-p">115</text></g>
<g class="puesto" id="p-138"><rect x="315" y="500" width="25" height="25"/><text x="327.5" y="512.5" class="texto-p">138</text></g>
<g class="puesto" id="p-141"><rect x="315" y="525" width="25" height="25"/><text x="327.5" y="537.5" class="texto-p">141</text></g>


// Column 23 down to 17 & B 
<g class="puesto" id="p-23"><rect x="1200" y="350" width="25" height="20"/><text x="1212.5" y="360" class="texto-p">23</text></g>
<g class="puesto" id="p-22"><rect x="1200" y="375" width="25" height="20"/><text x="1212.5" y="385" class="texto-p">22</text></g>
<g class="puesto" id="p-21"><rect x="1200" y="400" width="25" height="20"/><text x="1212.5" y="410" class="texto-p">21</text></g>
<g class="puesto" id="p-20"><rect x="1200" y="425" width="25" height="20"/><text x="1212.5" y="435" class="texto-p">20</text></g>
<g class="puesto" id="p-19"><rect x="1200" y="450" width="25" height="20"/><text x="1212.5" y="460" class="texto-p">19</text></g>
<g class="puesto" id="p-18"><rect x="1200" y="475" width="25" height="20"/><text x="1212.5" y="485" class="texto-p">18</text></g>
<g class="puesto" id="p-17"><rect x="1200" y="500" width="25" height="20"/><text x="1212.5" y="510" class="texto-p">17</text></g>
<g class="puesto" id="p-B"><rect x="1200" y="525" width="25" height="20"/><text x="1212.5" y="535" class="texto-p">B</text></g>

// Row 16 to 11 
<g class="puesto" id="p-16"><rect x="1175" y="525" width="25" height="20"/><text x="1187.5" y="535" class="texto-p">16</text></g>
<g class="puesto" id="p-15"><rect x="1150" y="525" width="25" height="20"/><text x="1162.5" y="535" class="texto-p">15</text></g>
<g class="puesto" id="p-14"><rect x="1125" y="525" width="25" height="20"/><text x="1137.5" y="535" class="texto-p">14</text></g>
<g class="puesto" id="p-13"><rect x="1100" y="525" width="25" height="20"/><text x="1112.5" y="535" class="texto-p">13</text></g>
<g class="puesto" id="p-12"><rect x="1075" y="525" width="25" height="20"/><text x="1087.5" y="535" class="texto-p">12</text></g>
<g class="puesto" id="p-11"><rect x="1050" y="525" width="25" height="20"/><text x="1062.5" y="535" class="texto-p">11</text></g>

// Column 10 to 3 
<g class="puesto" id="p-10"><rect x="1050" y="545" width="25" height="20"/><text x="1062.5" y="555" class="texto-p">10</text></g>
<g class="puesto" id="p-9"><rect x="1050" y="565" width="25" height="20"/><text x="1062.5" y="575" class="texto-p">9</text></g>
<g class="puesto" id="p-8"><rect x="1050" y="585" width="25" height="20"/><text x="1062.5" y="595" class="texto-p">8</text></g>
<g class="puesto" id="p-7"><rect x="1050" y="605" width="25" height="20"/><text x="1062.5" y="615" class="texto-p">7</text></g>
<g class="puesto" id="p-6"><rect x="1050" y="625" width="25" height="20"/><text x="1062.5" y="635" class="texto-p">6</text></g>
<g class="puesto" id="p-5"><rect x="1050" y="645" width="25" height="20"/><text x="1062.5" y="655" class="texto-p">5</text></g>
<g class="puesto" id="p-4"><rect x="1050" y="665" width="25" height="20"/><text x="1062.5" y="675" class="texto-p">4</text></g>
<g class="puesto" id="p-3"><rect x="1050" y="685" width="25" height="20"/><text x="1062.5" y="695" class="texto-p">3</text></g>

// Blacked block below 3 
<rect x="1050" y="705" width="30" height="125" class="puesto-negro"/>
<g class="puesto" id="p-2"><rect x="1025" y="755" width="25" height="20"/><text x="1037.5" y="765" class="texto-p">2</text></g>
<g class="puesto" id="p-1"><rect x="1025" y="780" width="25" height="20"/><text x="1037.5" y="790" class="texto-p">1</text></g>


<g class="puesto" id="p-87"><rect x="370" y="370" width="25" height="20"/><text x="382.5" y="380" class="texto-p">87</text></g>
<g class="puesto" id="p-86"><rect x="395" y="370" width="25" height="20"/><text x="407.5" y="380" class="texto-p">86</text></g>
<g class="puesto" id="p-85"><rect x="420" y="370" width="25" height="20"/><text x="432.5" y="380" class="texto-p">85</text></g>
<g class="puesto" id="p-84b"><rect x="445" y="370" width="25" height="20"/><text x="457.5" y="380" class="texto-p">84b</text></g>
<g class="puesto" id="p-84"><rect x="470" y="370" width="25" height="20"/><text x="482.5" y="380" class="texto-p">84</text></g>
<g class="puesto" id="p-83"><rect x="495" y="370" width="25" height="20"/><text x="507.5" y="380" class="texto-p">83</text></g>
<g class="puesto" id="p-82"><rect x="520" y="370" width="25" height="20"/><text x="532.5" y="380" class="texto-p">82</text></g>
<g class="puesto" id="p-81"><rect x="545" y="370" width="25" height="20"/><text x="557.5" y="380" class="texto-p">81</text></g>
<g class="puesto" id="p-80"><rect x="570" y="370" width="25" height="20"/><text x="582.5" y="380" class="texto-p">80</text></g>
<g class="puesto" id="p-79"><rect x="595" y="370" width="25" height="20"/><text x="607.5" y="380" class="texto-p">79</text></g>
<g class="puesto" id="p-78"><rect x="620" y="370" width="25" height="20"/><text x="632.5" y="380" class="texto-p">78</text></g>

// Block 90-101 / 114-102 
<g class="puesto" id="p-90"><rect x="345" y="425" width="25" height="20"/><text x="357.5" y="435" class="texto-p">90</text></g>
<g class="puesto" id="p-91"><rect x="370" y="425" width="25" height="20"/><text x="382.5" y="435" class="texto-p">91</text></g>
<g class="puesto" id="p-92"><rect x="395" y="425" width="25" height="20"/><text x="407.5" y="435" class="texto-p">92</text></g>
<g class="puesto" id="p-93"><rect x="420" y="425" width="25" height="20"/><text x="432.5" y="435" class="texto-p">93</text></g>
<g class="puesto" id="p-94"><rect x="445" y="425" width="25" height="20"/><text x="457.5" y="435" class="texto-p">94</text></g>
<g class="puesto" id="p-95"><rect x="470" y="425" width="25" height="20"/><text x="482.5" y="435" class="texto-p">95</text></g>
<g class="puesto" id="p-96"><rect x="495" y="425" width="25" height="20"/><text x="507.5" y="435" class="texto-p">96</text></g>
<g class="puesto" id="p-97"><rect x="520" y="425" width="25" height="20"/><text x="532.5" y="435" class="texto-p">97</text></g>
<g class="puesto" id="p-98"><rect x="545" y="425" width="25" height="20"/><text x="557.5" y="435" class="texto-p">98</text></g>
<g class="puesto" id="p-99"><rect x="570" y="425" width="25" height="20"/><text x="582.5" y="435" class="texto-p">99</text></g>
<g class="puesto" id="p-100"><rect x="595" y="425" width="25" height="20"/><text x="607.5" y="435" class="texto-p">100</text></g>
<g class="puesto" id="p-101"><rect x="620" y="425" width="25" height="20"/><text x="632.5" y="435" class="texto-p">101</text></g>

<g class="puesto" id="p-114"><rect x="320" y="445" width="25" height="20"/><text x="332.5" y="455" class="texto-p">114</text></g>
<g class="puesto" id="p-113"><rect x="345" y="445" width="25" height="20"/><text x="357.5" y="455" class="texto-p">113</text></g>
<g class="puesto" id="p-112"><rect x="370" y="445" width="25" height="20"/><text x="382.5" y="455" class="texto-p">112</text></g>
<g class="puesto" id="p-111"><rect x="395" y="445" width="25" height="20"/><text x="407.5" y="455" class="texto-p">111</text></g>
<g class="puesto" id="p-110"><rect x="420" y="445" width="25" height="20"/><text x="432.5" y="455" class="texto-p">110</text></g>
<g class="puesto" id="p-109"><rect x="445" y="445" width="25" height="20"/><text x="457.5" y="455" class="texto-p">109</text></g>
<g class="puesto" id="p-108"><rect x="470" y="445" width="25" height="20"/><text x="482.5" y="455" class="texto-p">108</text></g>
<g class="puesto" id="p-107"><rect x="495" y="445" width="25" height="20"/><text x="507.5" y="455" class="texto-p">107</text></g>
<g class="puesto" id="p-106"><rect x="520" y="445" width="25" height="20"/><text x="532.5" y="455" class="texto-p">106</text></g>
<g class="puesto" id="p-105"><rect x="545" y="445" width="25" height="20"/><text x="557.5" y="455" class="texto-p">105</text></g>
<g class="puesto" id="p-104"><rect x="570" y="445" width="25" height="20"/><text x="582.5" y="455" class="texto-p">104</text></g>
<g class="puesto" id="p-103"><rect x="595" y="445" width="25" height="20"/><text x="607.5" y="455" class="texto-p">103</text></g>
<g class="puesto" id="p-102"><rect x="620" y="445" width="25" height="20"/><text x="632.5" y="455" class="texto-p">102</text></g>

// Block 116-126 / 137-127 
<g class="puesto" id="p-116"><rect x="370" y="500" width="25" height="20"/><text x="382.5" y="510" class="texto-p">116</text></g>
<g class="puesto" id="p-117"><rect x="395" y="500" width="25" height="20"/><text x="407.5" y="510" class="texto-p">117</text></g>
<g class="puesto" id="p-118"><rect x="420" y="500" width="25" height="20"/><text x="432.5" y="510" class="texto-p">118</text></g>
<g class="puesto" id="p-119"><rect x="445" y="500" width="25" height="20"/><text x="457.5" y="510" class="texto-p">119</text></g>
<g class="puesto" id="p-120"><rect x="470" y="500" width="25" height="20"/><text x="482.5" y="510" class="texto-p">120</text></g>
<g class="puesto" id="p-121"><rect x="495" y="500" width="25" height="20"/><text x="507.5" y="510" class="texto-p">121</text></g>
<g class="puesto" id="p-122"><rect x="520" y="500" width="25" height="20"/><text x="532.5" y="510" class="texto-p">122</text></g>
<g class="puesto" id="p-123"><rect x="545" y="500" width="25" height="20"/><text x="557.5" y="510" class="texto-p">123</text></g>
<g class="puesto" id="p-124"><rect x="570" y="500" width="25" height="20"/><text x="582.5" y="510" class="texto-p">124</text></g>
<g class="puesto" id="p-125"><rect x="595" y="500" width="25" height="20"/><text x="607.5" y="510" class="texto-p">125</text></g>
<g class="puesto" id="p-126"><rect x="620" y="500" width="25" height="20"/><text x="632.5" y="510" class="texto-p">126</text></g>

<g class="puesto" id="p-137"><rect x="370" y="520" width="25" height="20"/><text x="382.5" y="530" class="texto-p">137</text></g>
<g class="puesto" id="p-136"><rect x="395" y="520" width="25" height="20"/><text x="407.5" y="530" class="texto-p">136</text></g>
<g class="puesto" id="p-135"><rect x="420" y="520" width="25" height="20"/><text x="432.5" y="530" class="texto-p">135</text></g>
<g class="puesto" id="p-134"><rect x="445" y="520" width="25" height="20"/><text x="457.5" y="530" class="texto-p">134</text></g>
<g class="puesto" id="p-133"><rect x="470" y="520" width="25" height="20"/><text x="482.5" y="530" class="texto-p">133</text></g>
<g class="puesto" id="p-132"><rect x="495" y="520" width="25" height="20"/><text x="507.5" y="530" class="texto-p">132</text></g>
<g class="puesto" id="p-131"><rect x="520" y="520" width="25" height="20"/><text x="532.5" y="530" class="texto-p">131</text></g>
<g class="puesto" id="p-130"><rect x="545" y="520" width="25" height="20"/><text x="557.5" y="530" class="texto-p">130</text></g>
<g class="puesto" id="p-129"><rect x="570" y="520" width="25" height="20"/><text x="582.5" y="530" class="texto-p">129</text></g>
<g class="puesto" id="p-128"><rect x="595" y="520" width="25" height="20"/><text x="607.5" y="530" class="texto-p">128</text></g>
<g class="puesto" id="p-127"><rect x="620" y="520" width="25" height="20"/><text x="632.5" y="530" class="texto-p">127</text></g>

// Bottom Row 139 to 156 
<g class="puesto" id="p-139"><rect x="320" y="580" width="25" height="20"/><text x="332.5" y="590" class="texto-p">139</text></g>
<g class="puesto" id="p-140"><rect x="345" y="580" width="25" height="20"/><text x="357.5" y="590" class="texto-p">140</text></g>
<g class="puesto" id="p-142"><rect x="370" y="580" width="25" height="20"/><text x="382.5" y="590" class="texto-p">142</text></g>
<g class="puesto" id="p-143"><rect x="395" y="580" width="25" height="20"/><text x="407.5" y="590" class="texto-p">143</text></g>
<g class="puesto" id="p-144"><rect x="420" y="580" width="25" height="20"/><text x="432.5" y="590" class="texto-p">144</text></g>
<g class="puesto" id="p-145"><rect x="445" y="580" width="25" height="20"/><text x="457.5" y="590" class="texto-p">145</text></g>
<g class="puesto" id="p-146"><rect x="470" y="580" width="25" height="20"/><text x="482.5" y="590" class="texto-p">146</text></g>
<g class="puesto" id="p-147"><rect x="495" y="580" width="25" height="20"/><text x="507.5" y="590" class="texto-p">147</text></g>
<g class="puesto" id="p-148"><rect x="520" y="580" width="25" height="20"/><text x="532.5" y="590" class="texto-p">148</text></g>
<g class="puesto" id="p-149"><rect x="545" y="580" width="25" height="20"/><text x="557.5" y="590" class="texto-p">149</text></g>
<g class="puesto" id="p-150"><rect x="570" y="580" width="25" height="20"/><text x="582.5" y="590" class="texto-p">150</text></g>
<g class="puesto" id="p-151"><rect x="595" y="580" width="25" height="20"/><text x="607.5" y="590" class="texto-p">151</text></g>
<g class="puesto" id="p-152"><rect x="620" y="580" width="25" height="20"/><text x="632.5" y="590" class="texto-p">152</text></g>
<g class="puesto" id="p-153"><rect x="645" y="600" width="25" height="20"/><text x="657.5" y="610" class="texto-p">153</text></g>
<g class="puesto" id="p-154"><rect x="645" y="735" width="25" height="20"/><text x="657.5" y="745" class="texto-p">154</text></g>
<g class="puesto" id="p-155"><rect x="645" y="755" width="25" height="20"/><text x="657.5" y="765" class="texto-p">155</text></g>
<g class="puesto" id="p-156"><rect x="645" y="775" width="25" height="20"/><text x="657.5" y="785" class="texto-p">156</text></g>


<g class="puesto" id="p-197"><rect x="755" y="200" width="25" height="18"/><text x="767.5" y="209" class="texto-p">197</text></g>
<g class="puesto" id="p-196"><rect x="755" y="218" width="25" height="18"/><text x="767.5" y="227" class="texto-p">196</text></g>
<g class="puesto" id="p-195"><rect x="755" y="236" width="25" height="18"/><text x="767.5" y="245" class="texto-p">195</text></g>
<g class="puesto" id="p-194"><rect x="755" y="254" width="25" height="18"/><text x="767.5" y="263" class="texto-p">194</text></g>

// Block 164-168 / 193-189 
<g class="puesto" id="p-164"><rect x="730" y="350" width="25" height="18"/><text x="742.5" y="359" class="texto-p">164</text></g>
<g class="puesto" id="p-165"><rect x="730" y="368" width="25" height="18"/><text x="742.5" y="377" class="texto-p">165</text></g>
<g class="puesto" id="p-166"><rect x="730" y="386" width="25" height="18"/><text x="742.5" y="395" class="texto-p">166</text></g>
<g class="puesto" id="p-167"><rect x="730" y="404" width="25" height="18"/><text x="742.5" y="413" class="texto-p">167</text></g>
<g class="puesto" id="p-168"><rect x="730" y="422" width="25" height="18"/><text x="742.5" y="431" class="texto-p">168</text></g>

<g class="puesto" id="p-193"><rect x="755" y="350" width="25" height="18"/><text x="767.5" y="359" class="texto-p">193</text></g>
<g class="puesto" id="p-192"><rect x="755" y="368" width="25" height="18"/><text x="767.5" y="377" class="texto-p">192</text></g>
<g class="puesto" id="p-191"><rect x="755" y="386" width="25" height="18"/><text x="767.5" y="395" class="texto-p">191</text></g>
<g class="puesto" id="p-190"><rect x="755" y="404" width="25" height="18"/><text x="767.5" y="413" class="texto-p">190</text></g>
<g class="puesto" id="p-189"><rect x="755" y="422" width="25" height="18"/><text x="767.5" y="431" class="texto-p">189</text></g>

// Block 169-178 / 188-179 
<g class="puesto" id="p-169"><rect x="730" y="520" width="25" height="18"/><text x="742.5" y="529" class="texto-p">169</text></g>
<g class="puesto" id="p-170"><rect x="730" y="538" width="25" height="18"/><text x="742.5" y="547" class="texto-p">170</text></g>
<g class="puesto" id="p-171"><rect x="730" y="556" width="25" height="18"/><text x="742.5" y="565" class="texto-p">171</text></g>
<g class="puesto" id="p-172"><rect x="730" y="574" width="25" height="18"/><text x="742.5" y="583" class="texto-p">172</text></g>
<g class="puesto" id="p-173"><rect x="730" y="592" width="25" height="18"/><text x="742.5" y="601" class="texto-p">173</text></g>
<g class="puesto" id="p-174"><rect x="730" y="610" width="25" height="18"/><text x="742.5" y="619" class="texto-p">174</text></g>
<g class="puesto" id="p-175"><rect x="730" y="628" width="25" height="18"/><text x="742.5" y="637" class="texto-p">175</text></g>
<g class="puesto" id="p-176"><rect x="730" y="646" width="25" height="18"/><text x="742.5" y="655" class="texto-p">176</text></g>
<g class="puesto" id="p-177"><rect x="730" y="664" width="25" height="18"/><text x="742.5" y="673" class="texto-p">177</text></g>
<g class="puesto" id="p-178"><rect x="730" y="682" width="25" height="18"/><text x="742.5" y="691" class="texto-p">178</text></g>

<g class="puesto" id="p-188"><rect x="755" y="520" width="25" height="18"/><text x="767.5" y="529" class="texto-p">188</text></g>
<g class="puesto" id="p-187"><rect x="755" y="538" width="25" height="18"/><text x="767.5" y="547" class="texto-p">187</text></g>
<g class="puesto" id="p-186"><rect x="755" y="556" width="25" height="18"/><text x="767.5" y="565" class="texto-p">186</text></g>
<g class="puesto" id="p-185"><rect x="755" y="574" width="25" height="18"/><text x="767.5" y="583" class="texto-p">185</text></g>
<g class="puesto" id="p-184"><rect x="755" y="592" width="25" height="18"/><text x="767.5" y="601" class="texto-p">184</text></g>
<g class="puesto" id="p-183"><rect x="755" y="610" width="25" height="18"/><text x="767.5" y="619" class="texto-p">183</text></g>
<g class="puesto" id="p-182"><rect x="755" y="628" width="25" height="18"/><text x="767.5" y="637" class="texto-p">182</text></g>
<g class="puesto" id="p-181"><rect x="755" y="646" width="25" height="18"/><text x="767.5" y="655" class="texto-p">181</text></g>
<g class="puesto" id="p-180"><rect x="755" y="664" width="25" height="18"/><text x="767.5" y="673" class="texto-p">180</text></g>
<g class="puesto" id="p-179"><rect x="755" y="682" width="25" height="18"/><text x="767.5" y="691" class="texto-p">179</text></g>


<g class="puesto" id="p-235"><rect x="850" y="200" width="25" height="18"/><text x="862.5" y="209" class="texto-p">235</text></g>
<g class="puesto" id="p-234"><rect x="850" y="218" width="25" height="18"/><text x="862.5" y="227" class="texto-p">234</text></g>
<g class="puesto" id="p-233"><rect x="850" y="236" width="25" height="18"/><text x="862.5" y="245" class="texto-p">233</text></g>
<g class="puesto" id="p-232"><rect x="850" y="254" width="25" height="18"/><text x="862.5" y="263" class="texto-p">232</text></g>

// Block 202-206 / 231-227 
<g class="puesto" id="p-202"><rect x="825" y="350" width="25" height="18"/><text x="837.5" y="359" class="texto-p">202</text></g>
<g class="puesto" id="p-203"><rect x="825" y="368" width="25" height="18"/><text x="837.5" y="377" class="texto-p">203</text></g>
<g class="puesto" id="p-204"><rect x="825" y="386" width="25" height="18"/><text x="837.5" y="395" class="texto-p">204</text></g>
<g class="puesto" id="p-205"><rect x="825" y="404" width="25" height="18"/><text x="837.5" y="413" class="texto-p">205</text></g>
<g class="puesto" id="p-206"><rect x="825" y="422" width="25" height="18"/><text x="837.5" y="431" class="texto-p">206</text></g>

<g class="puesto" id="p-231"><rect x="850" y="350" width="25" height="18"/><text x="862.5" y="359" class="texto-p">231</text></g>
<g class="puesto" id="p-230"><rect x="850" y="368" width="25" height="18"/><text x="862.5" y="377" class="texto-p">230</text></g>
<g class="puesto" id="p-229"><rect x="850" y="386" width="25" height="18"/><text x="862.5" y="395" class="texto-p">229</text></g>
<g class="puesto" id="p-228"><rect x="850" y="404" width="25" height="18"/><text x="862.5" y="413" class="texto-p">228</text></g>
<g class="puesto" id="p-227"><rect x="850" y="422" width="25" height="18"/><text x="862.5" y="431" class="texto-p">227</text></g>

// Block 207-216 / 226-217 
<g class="puesto" id="p-207"><rect x="825" y="520" width="25" height="18"/><text x="837.5" y="529" class="texto-p">207</text></g>
<g class="puesto" id="p-208"><rect x="825" y="538" width="25" height="18"/><text x="837.5" y="547" class="texto-p">208</text></g>
<g class="puesto" id="p-209"><rect x="825" y="556" width="25" height="18"/><text x="837.5" y="565" class="texto-p">209</text></g>
<g class="puesto" id="p-210"><rect x="825" y="574" width="25" height="18"/><text x="837.5" y="583" class="texto-p">210</text></g>
<g class="puesto" id="p-211"><rect x="825" y="592" width="25" height="18"/><text x="837.5" y="601" class="texto-p">211</text></g>
<g class="puesto" id="p-212"><rect x="825" y="610" width="25" height="18"/><text x="837.5" y="619" class="texto-p">212</text></g>
<g class="puesto" id="p-213"><rect x="825" y="628" width="25" height="18"/><text x="837.5" y="637" class="texto-p">213</text></g>
<g class="puesto" id="p-214"><rect x="825" y="646" width="25" height="18"/><text x="837.5" y="655" class="texto-p">214</text></g>
<g class="puesto" id="p-215"><rect x="825" y="664" width="25" height="18"/><text x="837.5" y="673" class="texto-p">215</text></g>
<g class="puesto" id="p-216"><rect x="825" y="682" width="25" height="18"/><text x="837.5" y="691" class="texto-p">216</text></g>

<g class="puesto" id="p-226"><rect x="850" y="520" width="25" height="18"/><text x="862.5" y="529" class="texto-p">226</text></g>
<g class="puesto" id="p-225"><rect x="850" y="538" width="25" height="18"/><text x="862.5" y="547" class="texto-p">225</text></g>
<g class="puesto" id="p-224"><rect x="850" y="556" width="25" height="18"/><text x="862.5" y="565" class="texto-p">224</text></g>
<g class="puesto" id="p-223"><rect x="850" y="574" width="25" height="18"/><text x="862.5" y="583" class="texto-p">223</text></g>
<g class="puesto" id="p-222"><rect x="850" y="592" width="25" height="18"/><text x="862.5" y="601" class="texto-p">222</text></g>
<g class="puesto" id="p-221"><rect x="850" y="610" width="25" height="18"/><text x="862.5" y="619" class="texto-p">221</text></g>
<g class="puesto" id="p-220"><rect x="850" y="628" width="25" height="18"/><text x="862.5" y="637" class="texto-p">220</text></g>
<g class="puesto" id="p-219"><rect x="850" y="646" width="25" height="18"/><text x="862.5" y="655" class="texto-p">219</text></g>
<g class="puesto" id="p-218"><rect x="850" y="664" width="25" height="18"/><text x="862.5" y="673" class="texto-p">218</text></g>
<g class="puesto" id="p-217"><rect x="850" y="682" width="25" height="18"/><text x="862.5" y="691" class="texto-p">217</text></g>


<g class="puesto" id="p-273"><rect x="945" y="200" width="25" height="18"/><text x="957.5" y="209" class="texto-p">273</text></g>
<g class="puesto" id="p-272"><rect x="945" y="218" width="25" height="18"/><text x="957.5" y="227" class="texto-p">272</text></g>
<g class="puesto" id="p-271"><rect x="945" y="236" width="25" height="18"/><text x="957.5" y="245" class="texto-p">271</text></g>
<g class="puesto" id="p-270"><rect x="945" y="254" width="25" height="18"/><text x="957.5" y="263" class="texto-p">270</text></g>

// Block 240-244 / 269-265 
<g class="puesto" id="p-240"><rect x="920" y="350" width="25" height="18"/><text x="932.5" y="359" class="texto-p">240</text></g>
<g class="puesto" id="p-241"><rect x="920" y="368" width="25" height="18"/><text x="932.5" y="377" class="texto-p">241</text></g>
<g class="puesto" id="p-242"><rect x="920" y="386" width="25" height="18"/><text x="932.5" y="395" class="texto-p">242</text></g>
<g class="puesto" id="p-243"><rect x="920" y="404" width="25" height="18"/><text x="932.5" y="413" class="texto-p">243</text></g>
<g class="puesto" id="p-244"><rect x="920" y="422" width="25" height="18"/><text x="932.5" y="431" class="texto-p">244</text></g>

<g class="puesto" id="p-269"><rect x="945" y="350" width="25" height="18"/><text x="957.5" y="359" class="texto-p">269</text></g>
<g class="puesto" id="p-268"><rect x="945" y="368" width="25" height="18"/><text x="957.5" y="377" class="texto-p">268</text></g>
<g class="puesto" id="p-267"><rect x="945" y="386" width="25" height="18"/><text x="957.5" y="395" class="texto-p">267</text></g>
<g class="puesto" id="p-266"><rect x="945" y="404" width="25" height="18"/><text x="957.5" y="413" class="texto-p">266</text></g>
<g class="puesto" id="p-265"><rect x="945" y="422" width="25" height="18"/><text x="957.5" y="431" class="texto-p">265</text></g>

// Block 245-254 / 264-255 
<g class="puesto" id="p-245"><rect x="920" y="520" width="25" height="18"/><text x="932.5" y="529" class="texto-p">245</text></g>
<g class="puesto" id="p-246"><rect x="920" y="538" width="25" height="18"/><text x="932.5" y="547" class="texto-p">246</text></g>
<g class="puesto" id="p-247"><rect x="920" y="556" width="25" height="18"/><text x="932.5" y="565" class="texto-p">247</text></g>
<g class="puesto" id="p-248"><rect x="920" y="574" width="25" height="18"/><text x="932.5" y="583" class="texto-p">248</text></g>
<g class="puesto" id="p-249"><rect x="920" y="592" width="25" height="18"/><text x="932.5" y="601" class="texto-p">249</text></g>
<g class="puesto" id="p-250"><rect x="920" y="610" width="25" height="18"/><text x="932.5" y="619" class="texto-p">250</text></g>
<g class="puesto" id="p-251"><rect x="920" y="628" width="25" height="18"/><text x="932.5" y="637" class="texto-p">251</text></g>
<g class="puesto" id="p-252"><rect x="920" y="646" width="25" height="18"/><text x="932.5" y="655" class="texto-p">252</text></g>
<g class="puesto" id="p-253"><rect x="920" y="664" width="25" height="18"/><text x="932.5" y="673" class="texto-p">253</text></g>
<g class="puesto" id="p-254"><rect x="920" y="682" width="25" height="18"/><text x="932.5" y="691" class="texto-p">254</text></g>

<g class="puesto" id="p-264"><rect x="945" y="520" width="25" height="18"/><text x="957.5" y="529" class="texto-p">264</text></g>
<g class="puesto" id="p-263"><rect x="945" y="538" width="25" height="18"/><text x="957.5" y="547" class="texto-p">263</text></g>
<g class="puesto" id="p-262"><rect x="945" y="556" width="25" height="18"/><text x="957.5" y="565" class="texto-p">262</text></g>
<g class="puesto" id="p-261"><rect x="945" y="574" width="25" height="18"/><text x="957.5" y="583" class="texto-p">261</text></g>
<g class="puesto" id="p-260"><rect x="945" y="592" width="25" height="18"/><text x="957.5" y="601" class="texto-p">260</text></g>
<g class="puesto" id="p-259"><rect x="945" y="610" width="25" height="18"/><text x="957.5" y="619" class="texto-p">259</text></g>
<g class="puesto" id="p-258"><rect x="945" y="628" width="25" height="18"/><text x="957.5" y="637" class="texto-p">258</text></g>
<g class="puesto" id="p-257"><rect x="945" y="646" width="25" height="18"/><text x="957.5" y="655" class="texto-p">257</text></g>
<g class="puesto" id="p-256"><rect x="945" y="664" width="25" height="18"/><text x="957.5" y="673" class="texto-p">256</text></g>
<g class="puesto" id="p-255"><rect x="945" y="682" width="25" height="18"/><text x="957.5" y="691" class="texto-p">255</text></g>


<g class="puesto" id="p-311"><rect x="1035" y="200" width="25" height="18"/><text x="1047.5" y="209" class="texto-p">311</text></g>
<g class="puesto" id="p-310"><rect x="1035" y="218" width="25" height="18"/><text x="1047.5" y="227" class="texto-p">310</text></g>
<g class="puesto" id="p-309"><rect x="1035" y="236" width="25" height="18"/><text x="1047.5" y="245" class="texto-p">309</text></g>
<g class="puesto" id="p-308"><rect x="1035" y="254" width="25" height="18"/><text x="1047.5" y="263" class="texto-p">308</text></g>

// Block 278-282 / 307-303 
<g class="puesto" id="p-278"><rect x="1010" y="350" width="25" height="18"/><text x="1022.5" y="359" class="texto-p">278</text></g>
<g class="puesto" id="p-279"><rect x="1010" y="368" width="25" height="18"/><text x="1022.5" y="377" class="texto-p">279</text></g>
<g class="puesto" id="p-280"><rect x="1010" y="386" width="25" height="18"/><text x="1022.5" y="395" class="texto-p">280</text></g>
<g class="puesto" id="p-281"><rect x="1010" y="404" width="25" height="18"/><text x="1022.5" y="413" class="texto-p">281</text></g>
<g class="puesto" id="p-282"><rect x="1010" y="422" width="25" height="18"/><text x="1022.5" y="431" class="texto-p">282</text></g>

<g class="puesto" id="p-307"><rect x="1035" y="350" width="25" height="18"/><text x="1047.5" y="359" class="texto-p">307</text></g>
<g class="puesto" id="p-306"><rect x="1035" y="368" width="25" height="18"/><text x="1047.5" y="377" class="texto-p">306</text></g>
<g class="puesto" id="p-305"><rect x="1035" y="386" width="25" height="18"/><text x="1047.5" y="395" class="texto-p">305</text></g>
<g class="puesto" id="p-304"><rect x="1035" y="404" width="25" height="18"/><text x="1047.5" y="413" class="texto-p">304</text></g>
<g class="puesto" id="p-303"><rect x="1035" y="422" width="25" height="18"/><text x="1047.5" y="431" class="texto-p">303</text></g>

// Block 283-292 / 302-293 
<g class="puesto" id="p-283"><rect x="1010" y="520" width="25" height="18"/><text x="1022.5" y="529" class="texto-p">283</text></g>
<g class="puesto" id="p-284"><rect x="1010" y="538" width="25" height="18"/><text x="1022.5" y="547" class="texto-p">284</text></g>
<g class="puesto" id="p-285"><rect x="1010" y="556" width="25" height="18"/><text x="1022.5" y="565" class="texto-p">285</text></g>
<g class="puesto" id="p-286"><rect x="1010" y="574" width="25" height="18"/><text x="1022.5" y="583" class="texto-p">286</text></g>
<g class="puesto" id="p-287"><rect x="1010" y="592" width="25" height="18"/><text x="1022.5" y="601" class="texto-p">287</text></g>
<g class="puesto" id="p-288"><rect x="1010" y="610" width="25" height="18"/><text x="1022.5" y="619" class="texto-p">288</text></g>
<g class="puesto" id="p-289"><rect x="1010" y="628" width="25" height="18"/><text x="1022.5" y="637" class="texto-p">289</text></g>
<g class="puesto" id="p-290"><rect x="1010" y="646" width="25" height="18"/><text x="1022.5" y="655" class="texto-p">290</text></g>
<g class="puesto" id="p-291"><rect x="1010" y="664" width="25" height="18"/><text x="1022.5" y="673" class="texto-p">291</text></g>
<g class="puesto" id="p-292"><rect x="1010" y="682" width="25" height="18"/><text x="1022.5" y="691" class="texto-p">292</text></g>

<g class="puesto" id="p-302"><rect x="1035" y="520" width="25" height="18"/><text x="1047.5" y="529" class="texto-p">302</text></g>
<g class="puesto" id="p-301"><rect x="1035" y="538" width="25" height="18"/><text x="1047.5" y="547" class="texto-p">301</text></g>
<g class="puesto" id="p-300"><rect x="1035" y="556" width="25" height="18"/><text x="1047.5" y="565" class="texto-p">300</text></g>
<g class="puesto" id="p-299"><rect x="1035" y="574" width="25" height="18"/><text x="1047.5" y="583" class="texto-p">299</text></g>
<g class="puesto" id="p-298"><rect x="1035" y="592" width="25" height="18"/><text x="1047.5" y="601" class="texto-p">298</text></g>
<g class="puesto" id="p-297"><rect x="1035" y="610" width="25" height="18"/><text x="1047.5" y="619" class="texto-p">297</text></g>
<g class="puesto" id="p-296"><rect x="1035" y="628" width="25" height="18"/><text x="1047.5" y="637" class="texto-p">296</text></g>
<g class="puesto" id="p-295"><rect x="1035" y="646" width="25" height="18"/><text x="1047.5" y="655" class="texto-p">295</text></g>
<g class="puesto" id="p-294"><rect x="1035" y="664" width="25" height="18"/><text x="1047.5" y="673" class="texto-p">294</text></g>
<g class="puesto" id="p-293"><rect x="1035" y="682" width="25" height="18"/><text x="1047.5" y="691" class="texto-p">293</text></g>


<g class="puesto" id="p-331"><rect x="1140" y="200" width="25" height="18"/><text x="1152.5" y="209" class="texto-p">331</text></g>
<g class="puesto" id="p-330"><rect x="1140" y="218" width="25" height="18"/><text x="1152.5" y="227" class="texto-p">330</text></g>
<g class="puesto" id="p-329"><rect x="1140" y="236" width="25" height="18"/><text x="1152.5" y="245" class="texto-p">329</text></g>
<g class="puesto" id="p-328"><rect x="1140" y="254" width="25" height="18"/><text x="1152.5" y="263" class="texto-p">328</text></g>

// Block 316-320 / 327-323 
<g class="puesto" id="p-316"><rect x="1115" y="350" width="25" height="18"/><text x="1127.5" y="359" class="texto-p">316</text></g>
<g class="puesto" id="p-317"><rect x="1115" y="368" width="25" height="18"/><text x="1127.5" y="377" class="texto-p">317</text></g>
<g class="puesto" id="p-318"><rect x="1115" y="386" width="25" height="18"/><text x="1127.5" y="395" class="texto-p">318</text></g>
<g class="puesto" id="p-319"><rect x="1115" y="404" width="25" height="18"/><text x="1127.5" y="413" class="texto-p">319</text></g>
<g class="puesto" id="p-320"><rect x="1115" y="422" width="25" height="18"/><text x="1127.5" y="431" class="texto-p">320</text></g>
<g class="puesto" id="p-321"><rect x="1115" y="475" width="25" height="18"/><text x="1127.5" y="484" class="texto-p">321</text></g>

<g class="puesto" id="p-327"><rect x="1140" y="350" width="25" height="18"/><text x="1152.5" y="359" class="texto-p">327</text></g>
<g class="puesto" id="p-326"><rect x="1140" y="368" width="25" height="18"/><text x="1152.5" y="377" class="texto-p">326</text></g>
<g class="puesto" id="p-325"><rect x="1140" y="386" width="25" height="18"/><text x="1152.5" y="395" class="texto-p">325</text></g>
<g class="puesto" id="p-324"><rect x="1140" y="404" width="25" height="18"/><text x="1152.5" y="413" class="texto-p">324</text></g>
<g class="puesto" id="p-323"><rect x="1140" y="422" width="25" height="18"/><text x="1152.5" y="431" class="texto-p">323</text></g>
<g class="puesto" id="p-322"><rect x="1140" y="475" width="25" height="18"/><text x="1152.5" y="484" class="texto-p">322</text></g>

// Block 336-341 / 347-342 
<g class="puesto" id="p-336"><rect x="1215" y="350" width="25" height="18"/><text x="1227.5" y="359" class="texto-p">336</text></g>
<g class="puesto" id="p-337"><rect x="1215" y="368" width="25" height="18"/><text x="1227.5" y="377" class="texto-p">337</text></g>
<g class="puesto" id="p-338"><rect x="1215" y="386" width="25" height="18"/><text x="1227.5" y="395" class="texto-p">338</text></g>
<g class="puesto" id="p-339"><rect x="1215" y="404" width="25" height="18"/><text x="1227.5" y="413" class="texto-p">339</text></g>
<g class="puesto" id="p-340"><rect x="1215" y="422" width="25" height="18"/><text x="1227.5" y="431" class="texto-p">340</text></g>
<g class="puesto" id="p-341"><rect x="1215" y="475" width="25" height="18"/><text x="1227.5" y="484" class="texto-p">341</text></g>

<g class="puesto" id="p-347"><rect x="1240" y="350" width="25" height="18"/><text x="1252.5" y="359" class="texto-p">347</text></g>
<g class="puesto" id="p-346"><rect x="1240" y="368" width="25" height="18"/><text x="1252.5" y="377" class="texto-p">346</text></g>
<g class="puesto" id="p-345"><rect x="1240" y="386" width="25" height="18"/><text x="1252.5" y="395" class="texto-p">345</text></g>
<g class="puesto" id="p-344"><rect x="1240" y="404" width="25" height="18"/><text x="1252.5" y="413" class="texto-p">344</text></g>
<g class="puesto" id="p-343"><rect x="1240" y="422" width="25" height="18"/><text x="1252.5" y="431" class="texto-p">343</text></g>
<g class="puesto" id="p-342"><rect x="1240" y="475" width="25" height="18"/><text x="1252.5" y="484" class="texto-p">342</text></g>


// Block 159 & 352 
<g class="puesto" id="p-159"><rect x="740" y="830" width="25" height="20"/><text x="752.5" y="840" class="texto-p">159</text></g>
<g class="puesto" id="p-352"><rect x="740" y="850" width="25" height="20"/><text x="752.5" y="860" class="texto-p">352</text></g>

// Row 351, 350, 349, 348 
<g class="puesto" id="p-351"><rect x="875" y="825" width="25" height="20"/><text x="887.5" y="835" class="texto-p">351</text></g>
<g class="puesto" id="p-350"><rect x="900" y="825" width="25" height="20"/><text x="912.5" y="835" class="texto-p">350</text></g>
<g class="puesto" id="p-349"><rect x="925" y="825" width="25" height="20"/><text x="937.5" y="835" class="texto-p">349</text></g>
<g class="puesto" id="p-348"><rect x="950" y="825" width="25" height="20"/><text x="962.5" y="835" class="texto-p">348</text></g>

// Row 332, 333, 334, 335 
<g class="puesto" id="p-332"><rect x="990" y="855" width="25" height="20"/><text x="1002.5" y="865" class="texto-p">332</text></g>
<g class="puesto" id="p-333"><rect x="1015" y="855" width="25" height="20"/><text x="1027.5" y="865" class="texto-p">333</text></g>
<g class="puesto" id="p-334"><rect x="1040" y="855" width="25" height="20"/><text x="1052.5" y="865" class="texto-p">334</text></g>
<g class="puesto" id="p-335"><rect x="1065" y="855" width="25" height="20"/><text x="1077.5" y="865" class="texto-p">335</text></g>

        {/* Bloque negro */}
        <rect x="1050" y="705" width="30" height="125" className="puesto-negro"/>

      </svg>
    </div>
  );
};

export default MapaMercadoSVG;