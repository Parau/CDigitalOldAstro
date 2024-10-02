import React, {useRef, useEffect} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "/src/components/observable/sorveteria";

function SorveteriaObservable() {
  const viewofTemperatura32Ref = useRef();
  const graficoRef = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(notebook, name => {
      if (name === "viewof temperatura32") return new Inspector(viewofTemperatura32Ref.current);
      if (name === "Grafico") return new Inspector(graficoRef.current);
      return ["y","tabela","GraficoComLinhaCalculada","GraficoComLinhaCalculadaComparacao","data_curve","poly","Grafico2","polynome_terms","solver","fitting_curve"].includes(name);
    });
    return () => runtime.dispose();
  }, []);

  return (
    <>
      <div ref={viewofTemperatura32Ref} />
      <div ref={graficoRef} />
    </>
  );

}

export default SorveteriaObservable;

/***********
 * <Counter client:load /> renders the component on page load.
<Counter client:idle /> renders the component as soon as the browser has some free time.
<Counter client:visible /> renders the component only once it is scrolled into view.
<Counter client:media="{media query here}" /> renders the component only if the media query applies.
<Counter client:only="react" /> only renders this component on the client, and doesn’t server-render it into static HTML.
<Counter /> (with no option specified) renders an HTML-only version of the component, so any click handlers or state won’t work.
 */