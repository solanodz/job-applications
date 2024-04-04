import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaCircle, FaFilter } from "react-icons/fa";
import api from "@/api";

export default async function Home() {


  const data = await api.jobs.list();

  {/* const csv = await fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQEawQE4WjBupoMl0G2MIl58AdHDluQ8y_l3qIeDOUUVATkaH4RzP2iYuAcXr4KMtP4UdxrHO5cqzxL/pub?output=csv`)
    .then((res) => res.text());

  const data = csv
    .split("\n")
    .slice(1)
    .map((data) => {
      const [fecha, empresa, tituloPuesto, postuleEn, respondieron, entrevista] = data.split(",");
      return { fecha, empresa, tituloPuesto, postuleEn, respondieron, entrevista };
    }); */}


  return (
    <main className="mx-5 mx:mx-10 min-h-screen p-5 md:p-16">
      <div className="flex flex-col  text-center">
        <h1 className="text-2xl sm:text-5xl font-bold tracking-tight">SZ Aplicaciones laborales</h1>
        <p className="italic max-w-md mx-auto leading-tight text-sm text-muted-foreground">Muestra información sobre todas las vacantes de desarrollador frontend o fullstack a las que apliqué desde el 3 de Abril de 2024.</p>
      </div>
      <section>
        <h2 className="text-xl sm:text-3xl max-w-xl my-12 font-semibold ">Vas aplicando a {data.length} puestos de trabajo</h2>
        <div className="flex md:flex-row flex-col justify-between gap-4">
          <div className="w-full md:w-96 gap-3 flex flex-col">
            <div className="flex flex-col gap-2 h-fit p-2 rounded-lg border border-zinc-800">
              <h3 className="text-2xl font-bold my-2">Filtros</h3>
              <Input placeholder="Buscar por empresa" size='sm' />
              <Input placeholder="Buscar por puesto" size='sm' />
              <Input placeholder="Buscar por fecha" type="date" size='sm' />
              <Button className='flex gap-4 items-center'><FaFilter /> Aplicar Filtros</Button>
            </div>
            {/* <div className="flex flex-col gap-1 items-center mr-auto">
              <p className="text-muted-foreground flex w-full items-center gap-3"><FaCircle className="text-green-500" />Tuve entrevista</p>
              <p className="text-muted-foreground flex gap-3 w-full items-center"><FaCircle className="text-red-500" />No tuve entrevista</p>
            </div> */}
          </div>
          <div className="w-full border border-zinc-800 rounded-lg p-2">
            {
              data.map((data, index) => (
                <div key={index} className="flex flex-row justify-between items-center py-3 border-b border-zinc-800">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <h3 className="font-bold">{data.empresa}</h3>
                      <p className="text-muted-foreground">{data.tituloPuesto}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center sm:items-end">
                    <p className="text-muted-foreground">{data.fecha}</p>
                    <button className="btn btn-primary">Ver detalles</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

      </section>
    </main>
  );
}
