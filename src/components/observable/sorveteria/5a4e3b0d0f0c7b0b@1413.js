function _1(md){return(
md`# Sorveteria
Analisando o viés nos dados.`
)}

function _2(htl){return(
htl.html`<p>Para um conjunto de dados de pares <i>x,y</i> (anotações do consumo de sorvete), é avaliada uma regressão polinomial de ordem <i>n</i>, <i>f(x)</i>:</p>`
)}

function _3(tex){return(
tex.block`
f(x) = a_0 + a_1 \, x + a_2 \, x^2 + \, a_3 \, x^3 + \cdots +  a_n \, x^n
`
)}

function _4(htl){return(
htl.html`onde <i>a</i><sub>0</sub>, <i>a</i><sub>1</sub>, <i>a</i><sub>2</sub>, <i>a</i><sub>3</sub>, &hellip; ,  <i>a</i><sub>n</sub>, representam os coeficientes.`
)}

function _5(htl){return(
htl.html`<h4><b>①</b> Preencher os dados coletados na forma <i>x</i>,<i>y</i>.</h4>
<p>  
Digite ou cole os dados em pares <i>x</i>,<i>y</i> no campo abaixo:<sup><b>(*)</b></sup></p>
<p style="font-size:15px"><b>*</b> <i>Digite dados: Use um único espaço entre os dados x e y, pressione enter para introduzir um novo ponto.
</br> &nbsp;&nbsp; Cole dados: Copie os dados x,y de uma planilha.</i>
</p>`
)}

function _data(html){return(
html`<textarea name="data" title="Enter or copy/paste free-form x,y paired data in this window" style="width:145px;height:395px; background-color:#f5f5f5; padding:10px" cols="40" rows="5">x	y
******	******
30 150
32 180
35 220
31 190
28 160
34 210
36 240
30 200
29 180
28 170
</textarea>`
)}

function _7(md){return(
md`**Table a com os dados digitados acima**`
)}

function _tabela(x,y,html)
{
// Combine os valores de x e y em um array de objetos e ordene-os
let pares = x.map((value, index) => ({ x: value, y: y[index] }));
let paresOrdenados = pares.sort((a, b) => a.x - b.x); // Ordene por x; altere para b.y - a.y se desejar ordenar por y

return (
// Crie uma célula que renderiza a tabela
html`<table class="styled-table">
  <thead>
    <tr>
      <th>X</th>
      <th>Y</th>
    </tr>
  </thead>
  <tbody>
    ${paresOrdenados.map(par => html`<tr>
      <td>${par.x}</td>
      <td>${par.y}</td>
    </tr>`)}
  </tbody>
</table>

<style>
.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 18px;
  font-family: 'Arial', sans-serif;
  width: 100px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table th,
.styled-table td {
  text-align: center;
}
.styled-table th {
  background-color: #0000FF;
  color: #ffffff;
  text-align: center;
}
.styled-table tr {
  border-bottom: 1px solid #dddddd;
}
.styled-table tr:nth-of-type(even) {
  background-color: #f3f3f3;
}
.styled-table tr:last-of-type {
  border-bottom: 2px solid #009879;
}
.styled-table tr:hover {
  background-color: #f1f1f1;
}
</style>`
);
}


function _9(htl){return(
htl.html`<br>
<h4><b>②</b> Desenhe a linha que tenha a maior proximidade aos pontos</h4>
Mais informações sobre o <a href="https://pt.khanacademy.org/math/ap-statistics/bivariate-data-ap/least-squares-regression/v/calculating-the-equation-of-a-regression-line">cálculo da equação de uma reta de regressão usando a estratégia dos <b>mínimos quadrados</b></a>.<br>
O cálculo da linha está sendo feito segundo a equação <i> y = m . x + b</i>.<br>
<i>
m: coeficiente angular.<br>
b: coeficiente linear.
</i>
`
)}

function _line_m(Inputs){return(
Inputs.range([4.3, 10], {value: 5, step: 0.1, label: "coeficiente angular"})
)}

function _line_b(Inputs){return(
Inputs.range([0, 200], {value: 0, step: 1, label: "coeficiente linear"})
)}

function _12(Plot,x,y,data_curve,color_dot,line_b,line_m){return(
Plot.plot({
  inset: 0,
  grid: true,
  height: 500,
  width: 830,
  marginBottom: 55, 
  marginLeft: 65,
 
  x: {label: "X →  Temperatura Máxima", labelAnchor: "left", color: "blue", labelOffset: 45 },
  y: {label: "Y →  Quantidade ", anchor: "left", labelAnchor: "center" }, //↑
  style: { 
    fontSize: "16px",        
  },
  marks: [
    Plot.ruleX([Math.min(...x),Math.max(...x)]),

    Plot.ruleY([Math.min(...y),Math.max(...y)]),
    Plot.dot(data_curve, {x: "x", y: "y",  curve: "catmull-rom", stroke: color_dot, fill: 'white', r: 4}),
    Plot.line([{x: 28, y: 150 + line_b}, {x: 36, y: line_m * 35 + line_b}], {x: "x", y: "y",  curve: "catmull-rom", stroke: '#ff0000'}),
  ]
})
)}

function _13(md){return(
md`## Calculando a linha de regressão do modelo usando a técnica dos mínimos quadrados`
)}

function _GraficoComLinhaCalculada(Plot,x,y,data_curve,color_dot,fitting_curve,color_stroke)
{

  return (Plot.plot({
  inset: 0,
  grid: true,
  height: 500,
  width: 830,
  marginBottom: 55, 
  marginLeft: 65,
 
  x: {label: "X →  Temperatura Máxima", labelAnchor: "left", color: "blue", labelOffset: 45 },
  y: {label: "Y →  Quantidade ", anchor: "left", labelAnchor: "center" }, //↑
  style: { 
    fontSize: "16px",        
  },
  marks: [
    Plot.ruleX([Math.min(...x),Math.max(...x)]),
    Plot.ruleY([Math.min(...y),Math.max(...y)]),
    Plot.dot(data_curve, {x: "x", y: "y",  curve: "catmull-rom", stroke: color_dot, fill: 'white', r: 4}),
    Plot.line(fitting_curve, {x: "x", y: "y",  curve: "catmull-rom", stroke: color_stroke, strokeDasharray: "7,4"})
  ]
}));
}


function _15(md){return(
md`## Comparando com a linha que você traçou`
)}

function _16(htl){return(
htl.html`<br>
<h4><b>③</b>Defina o grau do polinômio</h4>`
)}

function _polynome_degree(Inputs){return(
Inputs.range([1, 10], {value: 1, step: 1, label: "Grau polinomial"})
)}

function _18(htl){return(
htl.html`<br>
<h4><b>④</b>Compare a linha calculada com a sua linha.</h4>`
)}

function _tracar_linha(Inputs){return(
Inputs.checkbox(["Sim"], {value: false, label: "Traçar a linha desenhada acima?"})
)}

function _GraficoComLinhaCalculadaComparacao(Plot,x,y,data_curve,color_dot,tracar_linha,line_b,line_m,fitting_curve,color_stroke)
{

 
  return (Plot.plot({
  inset: 0,
  grid: true,
  height: 500,
  width: 830,
  marginBottom: 55, 
  marginLeft: 65,
 
  x: {label: "X →  Temperatura Máxima", labelAnchor: "left", color: "blue", labelOffset: 45 },
  y: {label: "Y →  Quantidade ", anchor: "left", labelAnchor: "center" }, //↑
  style: { 
    fontSize: "16px",        
  },
  marks: [
    Plot.ruleX([Math.min(...x),Math.max(...x)]),
    Plot.ruleY([Math.min(...y),Math.max(...y)]),
    Plot.dot(data_curve, {x: "x", y: "y",  curve: "catmull-rom", stroke: color_dot, fill: 'white', r: 4}),
    
    Plot.line(tracar_linha == "Sim" ? [{x: 28, y: 150 + line_b}, {x: 36, y: line_m * 35 + line_b}]:[], {x: "x", y: "y",  curve: "catmull-rom", stroke: '#ff0000'}),
    Plot.line(fitting_curve, {x: "x", y: "y",  curve: "catmull-rom", stroke: color_stroke, strokeDasharray: "7,4"})
  ]
}));
}


function _21(md){return(
md`## Analisando o impacto de um outlier`
)}

function _temperatura32(Inputs){return(
Inputs.range([120, 400], {value: 180, step: 1, label: "Sorvetes vendidos temperatura 32°C"})
)}

function _Grafico(fitting_curve,Plot,color_dot,x,y,color_stroke,data_curve,tracar_linha,line_b,line_m)
{
  let targetX, targetY, targetYFormatted = 0;
  //acha o valor atual de 33 graus
  for (let i = 0; i < fitting_curve.length - 1; i++) {
    if (Math.ceil(fitting_curve[i].x) == 34) {
      console.log(fitting_curve[i]);
      targetX = fitting_curve[i].x;
      targetY = fitting_curve[i].y;
      targetYFormatted = Math.round(targetY);
      break;
    }
  }
  
  return (Plot.plot({
  inset: 0,
  grid: true,
  height: 500,
  width: 830,
  marginBottom: 55, 
  marginLeft: 65,
  x: {label: "X →  Temperatura Máxima", labelAnchor: "left", color: "blue", labelOffset: 45 },
  y: {label: "Y →  Quantidade ", anchor: "left", labelAnchor: "center" }, //↑
  style: { 
    fontSize: "16px",        
  },
  marks: [
    Plot.dot([{ x: targetX, y: targetY }], { x: "x", y: "y", fill: "orange", size: 100, stroke: color_dot, r: 4 }),
    Plot.ruleX([Math.min(...x),Math.max(...x)]),
    Plot.ruleY([Math.min(...y),Math.max(...y)]),
    Plot.line(fitting_curve, {x: "x", y: "y",  curve: "catmull-rom", stroke: color_stroke, strokeDasharray: "7,4"}),
    Plot.dot(data_curve, {x: "x", y: "y",  curve: "catmull-rom", stroke: color_dot, fill: 'white', r: 4}),
    Plot.line(tracar_linha == "Sim" ? [{x: 28, y: 150 + line_b}, {x: 36, y: line_m * 35 + line_b}]:[], {x: "x", y: "y",  curve: "catmull-rom", stroke: '#ff0000'}),
    Plot.ruleX([targetX], { stroke: "red" }),
    //Plot.ruleY([targetY], { stroke: "red" }),
    
    Plot.text([{ x: targetX, y: targetY, label: `~${targetYFormatted} SORVETES` }], 
      { x: "x", y: "y", text: "label", dy: 10, dx: 5, fill: "orange", fontWeight: "bold", fontSize: 14,
      dy:5, dx: 60},
     //Plot.dot([{ x: targetX, y: targetY }], { x: "x", y: "y", fill: "orange", size: 100 }),
    )
  ]
  })
  );
}


function _color_dot(Inputs){return(
Inputs.color({ label: "Dot color", value: "#4472C4", datalist: ["#4472C4", "#176A00", "#FF8000", "#C50707", "#000000"] })
)}

function _color_stroke(Inputs){return(
Inputs.color({ label: "Stroke color", value: "#FF8000", datalist: ["#FF8000", "#C50707", "#00B4FF", "#9C9C9C", "#000000"]  })
)}

function _26(md){return(
md`## Incluindo o R2`
)}

function _Grafico2(data_curve,d3,fitting_curve,Plot,color_dot,color_stroke,tracar_linha,line_b,line_m)
{
  let targetX, targetY, targetYFormatted = 0;
  let x = data_curve.map(d => d.x);
  let y = data_curve.map(d => d.y);
  
  // Calcular a linha de regressão
  const xMean = d3.mean(x);
  const yMean = d3.mean(y);
  
  const xyMean = d3.mean(x.map((val, i) => val * y[i]));
  const x2Mean = d3.mean(x.map(val => val * val));
  
  const slope = (xyMean - xMean * yMean) / (x2Mean - xMean * xMean);
  const intercept = yMean - slope * xMean;
  
  // Calcular os valores previstos
  const yPredicted = x.map(val => slope * val + intercept);
  
  // Calcular R²
  const ssTotal = y.reduce((sum, val) => sum + (val - yMean) ** 2, 0);
  const ssResidual = y.reduce((sum, val, i) => sum + (val - yPredicted[i]) ** 2, 0);
  const r2 = 1 - (ssResidual / ssTotal);
  
  // Adicionar informações para cada ponto
  const pointsWithInfo = data_curve.map((point, index) => ({
    ...point,
    predicted: yPredicted[index],
    residual: point.y - yPredicted[index]
  }));

  // Encontrar o valor atual de 33 graus
  for (let i = 0; i < fitting_curve.length - 1; i++) {
    if (Math.ceil(fitting_curve[i].x) == 34) {
      targetX = fitting_curve[i].x;
      targetY = fitting_curve[i].y;
      targetYFormatted = Math.round(targetY);
      break;
    }
  }
  
  return (Plot.plot({
    inset: 0,
    grid: true,
    height: 500,
    width: 700,
    x: {label: "x →        "},
    y: {label: "↑ y "},
    style: { fontSize: "11.5px" },
    marks: [
      Plot.dot([{ x: targetX, y: targetY }], { x: "x", y: "y", fill: "orange", size: 100, stroke: color_dot, r: 4 }),
      Plot.ruleX([Math.min(...x), Math.max(...x)]),
      Plot.ruleY([Math.min(...y), Math.max(...y)]),
      Plot.line(fitting_curve, {x: "x", y: "y",  curve: "catmull-rom", stroke: color_stroke, strokeDasharray: "7,4"}),
      Plot.dot(data_curve, {x: "x", y: "y",  curve: "catmull-rom", stroke: color_dot, fill: 'white', r: 4}),
      Plot.line(tracar_linha == "Sim" ? [{x: 28, y: 150 + line_b}, {x: 36, y: line_m * 35 + line_b}] : [], {x: "x", y: "y",  curve: "catmull-rom", stroke: '#ff0000'}),
      Plot.ruleX([targetX], { stroke: "red" }),
      //Plot.ruleY([targetY], { stroke: "red" }),
      Plot.text([{ x: targetX, y: targetY, label: `~${targetYFormatted} SORVETES` }], 
        { x: "x", y: "y", text: "label", dy: 10, dx: 5, fill: "orange", fontWeight: "bold", fontSize: 14,
        dy: 5, dx: 60}
      ),
      ...pointsWithInfo.map(point => 
        Plot.text([{ x: point.x, y: point.y, label: `P: ${point.predicted.toFixed(2)} E: ${point.residual.toFixed(2)}` }],
          { x: "x", y: "y", text: "label", dy: -10, dx: 5, fill: "black", fontWeight: "normal", fontSize: 10 }
        )
      ),
      Plot.text([{ x: Math.max(...x), y: Math.max(...y) * 0.9, label: `R² = ${r2.toFixed(2)}` }],
        { x: "x", y: "y", text: "label", dy: -10, dx: -10, fill: "black", fontWeight: "bold", fontSize: 14 }
      )
    ]
  }));
}


function _28(md){return(
md`---
## Appendix`
)}

function _29(md){return(
md`### Data and parameters`
)}

function _x(data)
{
  var data_x = [];
  var data_ = data.replaceAll(" ","\t").split("\n");
  const n = data_.length;
  for(var i=0; i < n; i++){
     if(!(isNaN(parseFloat(data_[i].split('\t')[0])) || isNaN(parseFloat(data_[i].split('\t')[1])))) {
      data_x.push(parseFloat(data_[i].split('\t')[0]));  
     }
  }
  return data_x;
}


function _y(data,temperatura32)
{
  var data_y = [];
  var data_ = data.replaceAll(" ","\t").split("\n");
  const n = data_.length;
  for(var i=0; i < n; i++){
     if(!(isNaN(parseFloat(data_[i].split('\t')[0])) || isNaN(parseFloat(data_[i].split('\t')[1])))) {
     data_y.push(parseFloat(data_[i].split('\t')[1]));  
    }
  }
  data_y[1] = temperatura32;
  return data_y;
}


function _data_curve(x,y)
{
  var data_curve = [];
  const n = x.length;
  for(var i = 0; i < n; i++)  
    {
      data_curve.push({"x":x[i],"y":y[i]});   
    }
  return data_curve;
}


function _fitting_curve(x,solver)
{
  var fitting_curve = [];
  var x_ = [];
  var y_ = [];
  const n = 500;
  const dx = (Math.max(...x)-Math.min(...x))/n;
  for(var i = 0; i < n; i++)  
  {
     x_[i] = Math.min(...x) + dx*i;
     y_[i] = solver(x_[i]);
     fitting_curve.push({"x":x_[i],"y":y_[i]});
  }
  return fitting_curve;
}


function _polynome_terms(poly,polynome_degree){return(
poly.computeCoefficients(polynome_degree)
)}

function _35(md){return(
md`### Javascript functions`
)}

function _poly(Polyfit,x,y){return(
Polyfit(x, y)
)}

function _solver(poly,polynome_degree){return(
poly.getPolynomial(polynome_degree)
)}

function _Polyfit(){return(
(function () {
    /**
     * Polyfit
     * @constructor
     * @param {number[]|Float32Array|Float64Array} x
     * @param {number[]|Float32Array|Float64Array} y
     */
    function Polyfit(x, y) {
        // Make sure we return an instance
        if (!(this instanceof Polyfit)) {
            return new Polyfit(x, y);
        }
        // Check that x any y are both arrays of the same type
        if (!((x instanceof Array && y instanceof Array) ||
            (x instanceof Float32Array && y instanceof Float32Array) ||
            (x instanceof Float64Array && y instanceof Float64Array))) {
            throw new Error('x and y must be arrays');
        }
        if (x instanceof Float32Array) {
            this.FloatXArray = Float32Array;
        }
        else if (x instanceof Float64Array) {
            this.FloatXArray = Float64Array;
        }
        // Make sure we have equal lengths
        if (x.length !== y.length) {
            throw new Error('x and y must have the same length');
        }
        this.x = x;
        this.y = y;
    }
    /**
     * Perform gauss-jordan division
     *
     * @param {number[][]|Float32Array[]|Float64Array[]} matrix - gets modified
     * @param {number} row
     * @param {number} col
     * @param {number} numCols
     * @returns void
     */
    Polyfit.gaussJordanDivide = function (matrix, row, col, numCols) {
        for (var i = col + 1; i < numCols; i++) {
            matrix[row][i] /= matrix[row][col];
        }
        matrix[row][col] = 1;
    };
    /**
     * Perform gauss-jordan elimination
     *
     * @param {number[][]|Float64Array[]} matrix - gets modified
     * @param {number} row
     * @param {number} col
     * @param {number} numRows
     * @param {number} numCols
     * @returns void
     */
    Polyfit.gaussJordanEliminate = function (matrix, row, col, numRows, numCols) {
        for (var i = 0; i < numRows; i++) {
            if (i !== row && matrix[i][col] !== 0) {
                for (var j = col + 1; j < numCols; j++) {
                    matrix[i][j] -= matrix[i][col] * matrix[row][j];
                }
                matrix[i][col] = 0;
            }
        }
    };
    /**
     * Perform gauss-jordan echelon method
     *
     * @param {number[][]|Float32Array[]|Float64Array[]} matrix - gets modified
     * @returns {number[][]|Float32Array[]|Float64Array[]} matrix
     */
    Polyfit.gaussJordanEchelonize = function (matrix) {
        var rows = matrix.length;
        var cols = matrix[0].length;
        var i = 0;
        var j = 0;
        var k;
        var swap;
        while (i < rows && j < cols) {
            k = i;
            // Look for non-zero entries in col j at or below row i
            while (k < rows && matrix[k][j] === 0) {
                k++;
            }
            // If an entry is found at row k
            if (k < rows) {
                // If k is not i, then swap row i with row k
                if (k !== i) {
                    swap = matrix[i];
                    matrix[i] = matrix[k];
                    matrix[k] = swap;
                }
                // If matrix[i][j] is != 1, divide row i by matrix[i][j]
                if (matrix[i][j] !== 1) {
                    Polyfit.gaussJordanDivide(matrix, i, j, cols);
                }
                // Eliminate all other non-zero entries
                Polyfit.gaussJordanEliminate(matrix, i, j, rows, cols);
                i++;
            }
            j++;
        }
        return matrix;
    };
    /**
     * Perform regression
     *
     * @param {number} x
     * @param {number[]|Float32Array[]|Float64Array[]} terms
     * @returns {number}
     */
    Polyfit.regress = function (x, terms) {
        var a = 0;
        var exp = 0;
        for (var i = 0, len = terms.length; i < len; i++) {
            a += terms[i] * Math.pow(x, exp++);
        }
        return a;
    };
    /**
     * Compute correlation coefficient
     *
     * @param {number[]|Float32Array[]|Float64Array[]} terms
     * @returns {number}
     */
    Polyfit.prototype.correlationCoefficient = function (terms) {
        var r = 0;
        var n = this.x.length;
        var sx = 0;
        var sx2 = 0;
        var sy = 0;
        var sy2 = 0;
        var sxy = 0;
        var x;
        var y;
        for (var i = 0; i < n; i++) {
            x = Polyfit.regress(this.x[i], terms);
            y = this.y[i];
            sx += x;
            sy += y;
            sxy += x * y;
            sx2 += x * x;
            sy2 += y * y;
        }
        var div = Math.sqrt((sx2 - (sx * sx) / n) * (sy2 - (sy * sy) / n));
        if (div !== 0) {
            r = Math.pow((sxy - (sx * sy) / n) / div, 2);
        }
        return r;
    };
    /**
     * Run standard error function
     *
     * @param {number[]|Float32Array[]|Float64Array[]} terms
     * @returns number
     */
    Polyfit.prototype.standardError = function (terms) {
        var r = 0;
        var n = this.x.length;
        if (n > 2) {
            var a = 0;
            for (var i = 0; i < n; i++) {
                a += Math.pow((Polyfit.regress(this.x[i], terms) - this.y[i]), 2);
            }
            r = Math.sqrt(a / (n - 2));
        }
        return r;
    };
    /**
     * Compute coefficients for given data matrix
     *
     * @param {number} p
     * @returns {number[]|Float32Array|Float64Array}
     */
    Polyfit.prototype.computeCoefficients = function (p) {
        var n = this.x.length;
        var r;
        var c;
        var rs = 2 * (++p) - 1;
        var i;
        var m = [];
        // Initialize array with 0 values
        if (this.FloatXArray) {
            // fast FloatXArray-Matrix init
            var bytesPerRow = (p + 1) * this.FloatXArray.BYTES_PER_ELEMENT;
            var buffer = new ArrayBuffer(p * bytesPerRow);
            for (i = 0; i < p; i++) {
                m[i] = new this.FloatXArray(buffer, i * bytesPerRow, p + 1);
            }
        }
        else {
            var zeroRow = [];
            for (i = 0; i <= p; i++) {
                zeroRow[i] = 0;
            }
            m[0] = zeroRow;
            for (i = 1; i < p; i++) {
                // copy zeroRow
                m[i] = zeroRow.slice();
            }
        }
        var mpc = [n];
        for (i = 1; i < rs; i++) {
            mpc[i] = 0;
        }
        for (i = 0; i < n; i++) {
            var x = this.x[i];
            var y = this.y[i];
            // Process precalculation array
            for (r = 1; r < rs; r++) {
                mpc[r] += Math.pow(x, r);
            }
            // Process RH column cells
            m[0][p] += y;
            for (r = 1; r < p; r++) {
                m[r][p] += Math.pow(x, r) * y;
            }
        }
        // Populate square matrix section
        for (r = 0; r < p; r++) {
            for (c = 0; c < p; c++) {
                m[r][c] = mpc[r + c];
            }
        }
        Polyfit.gaussJordanEchelonize(m);
        var terms = this.FloatXArray && new this.FloatXArray(m.length) || [];
        for (i = m.length - 1; i >= 0; i--) {
            terms[i] = m[i][p];
        }
        return terms;
    };
    /**
     * Using given degree of fitment, return a function that will calculate
     * the y for a given x
     *
     * @param {number} degree  > 0
     * @returns {Function}     f(x) =
     */
    Polyfit.prototype.getPolynomial = function (degree) {
        if (isNaN(degree) || degree < 0) {
            throw new Error('Degree must be a positive integer');
        }
        var terms = this.computeCoefficients(degree);
        var eqParts = [];
        eqParts.push(terms[0].toPrecision());
        for (var i = 1, len = terms.length; i < len; i++) {
            eqParts.push(terms[i] + ' * Math.pow(x, ' + i + ')');
        }
        var expr = 'return ' + eqParts.join(' + ') + ';';
        /* jshint evil: true */
        return new Function('x', expr);
        /* jshint evil: false */
    };
    /**
     * Convert the polynomial to a string expression, mostly useful for visual
     * debugging
     *
     * @param {number} degree
     * @returns {string}
     */
    Polyfit.prototype.toExpression = function (degree) {
        if (isNaN(degree) || degree < 0) {
            throw new Error('Degree must be a positive integer');
        }
        var terms = this.computeCoefficients(degree);
        var eqParts = [];
        var len = terms.length;
        eqParts.push(terms[0].toPrecision());
        for (var i = 1; i < len; i++) {
            eqParts.push(terms[i] + 'x^' + i);
        }
        return eqParts.join(' + ');
    };
    return Polyfit;
})()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["htl"], _2);
  main.variable(observer()).define(["tex"], _3);
  main.variable(observer()).define(["htl"], _4);
  main.variable(observer()).define(["htl"], _5);
  main.variable(observer("viewof data")).define("viewof data", ["html"], _data);
  main.variable(observer("data")).define("data", ["Generators", "viewof data"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("tabela")).define("tabela", ["x","y","html"], _tabela);
  main.variable(observer()).define(["htl"], _9);
  main.variable(observer("viewof line_m")).define("viewof line_m", ["Inputs"], _line_m);
  main.variable(observer("line_m")).define("line_m", ["Generators", "viewof line_m"], (G, _) => G.input(_));
  main.variable(observer("viewof line_b")).define("viewof line_b", ["Inputs"], _line_b);
  main.variable(observer("line_b")).define("line_b", ["Generators", "viewof line_b"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","x","y","data_curve","color_dot","line_b","line_m"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("GraficoComLinhaCalculada")).define("GraficoComLinhaCalculada", ["Plot","x","y","data_curve","color_dot","fitting_curve","color_stroke"], _GraficoComLinhaCalculada);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["htl"], _16);
  main.variable(observer("viewof polynome_degree")).define("viewof polynome_degree", ["Inputs"], _polynome_degree);
  main.variable(observer("polynome_degree")).define("polynome_degree", ["Generators", "viewof polynome_degree"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl"], _18);
  main.variable(observer("viewof tracar_linha")).define("viewof tracar_linha", ["Inputs"], _tracar_linha);
  main.variable(observer("tracar_linha")).define("tracar_linha", ["Generators", "viewof tracar_linha"], (G, _) => G.input(_));
  main.variable(observer("GraficoComLinhaCalculadaComparacao")).define("GraficoComLinhaCalculadaComparacao", ["Plot","x","y","data_curve","color_dot","tracar_linha","line_b","line_m","fitting_curve","color_stroke"], _GraficoComLinhaCalculadaComparacao);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("viewof temperatura32")).define("viewof temperatura32", ["Inputs"], _temperatura32);
  main.variable(observer("temperatura32")).define("temperatura32", ["Generators", "viewof temperatura32"], (G, _) => G.input(_));
  main.variable(observer("Grafico")).define("Grafico", ["fitting_curve","Plot","color_dot","x","y","color_stroke","data_curve","tracar_linha","line_b","line_m"], _Grafico);
  main.variable(observer("viewof color_dot")).define("viewof color_dot", ["Inputs"], _color_dot);
  main.variable(observer("color_dot")).define("color_dot", ["Generators", "viewof color_dot"], (G, _) => G.input(_));
  main.variable(observer("viewof color_stroke")).define("viewof color_stroke", ["Inputs"], _color_stroke);
  main.variable(observer("color_stroke")).define("color_stroke", ["Generators", "viewof color_stroke"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("Grafico2")).define("Grafico2", ["data_curve","d3","fitting_curve","Plot","color_dot","color_stroke","tracar_linha","line_b","line_m"], _Grafico2);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("x")).define("x", ["data"], _x);
  main.variable(observer("y")).define("y", ["data","temperatura32"], _y);
  main.variable(observer("data_curve")).define("data_curve", ["x","y"], _data_curve);
  main.variable(observer("fitting_curve")).define("fitting_curve", ["x","solver"], _fitting_curve);
  main.variable(observer("polynome_terms")).define("polynome_terms", ["poly","polynome_degree"], _polynome_terms);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("poly")).define("poly", ["Polyfit","x","y"], _poly);
  main.variable(observer("solver")).define("solver", ["poly","polynome_degree"], _solver);
  main.variable(observer("Polyfit")).define("Polyfit", _Polyfit);
  return main;
}
