import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaCircle, FaFilter } from "react-icons/fa";
import api from "@/api";
import DetailsDialog from "@/components/DetailsDialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge";

export default async function Home() {


  const data = await api.jobs.list();

  // if respuesta === 'Si' entonces sumar 1
  const resSi = () => {
    let count = 0;
    data.map((data) => {
      if (data.respondieron === 'Si') {
        count++;
      }
    });
    return count;
  }

  // nombre de las empresas que respondieron 'Si'
  const empresasSi = () => {
    let empresas = [];
    data.map((data) => {
      if (data.respondieron === 'Si') {
        empresas.push(data.empresa);
      }
    });
    return empresas;
  }

  /* const empresaEntrevista = () => {
    let empresas = [];
    data.map((data) => {
      if (data.entrevista === 'Si') {
        empresas.push(data.empresa);
      }
    });
    return empresas;
  } */

  // funcion para contar cuantas veces se repite una categoria
  const categoryFront = () => {
    let count = 0;
    data.map((data) => {
      if (data.categoria === 'Frontend') {
        count++;
      }
    });
    return count;
  }

  /* const category = () => {
    data.map((data) => {
      return data.categoria;
    });
  } */

  const categoryFull = () => {
    let count = 0;
    data.map((data) => {
      if (data.categoria === 'Fullstack') {
        count++;
      }
    });
    return count;
  }

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
    <main className="mx-2 mx:mx-10 min-h-screen p-2 md:p-16">
      <div className="flex flex-col  text-center">
        <h1 className="text-2xl sm:text-5xl font-bold tracking-tight">SZ Aplicaciones laborales</h1>
        <p className="italic max-w-md mx-auto leading-tight text-sm text-muted-foreground">Muestra información sobre todas las vacantes de desarrollador frontend o fullstack a las que apliqué desde el 3 de Abril de 2024.</p>
      </div>
      <section className="w-full flex md:flex-row flex-col gap-2 p-2 my-6">
        <div className="text-md sm:text-xl  font-semibold p-4 border border-zinc-800 rounded-lg flex md:w-2/6 min-h-40 flex-col gap-2">
          <h2>Vas aplicando a {data.length} puestos de trabajo</h2>
          <ul>
            <li>✓ {categoryFront()} para puestos Frontend </li>
            <li>✓ {categoryFull()} para puestos Fullstack </li>
          </ul>
        </div>

        <div className="text-md sm:text-xl  font-semibold p-4 border border-zinc-800 rounded-lg flex md:w-4/6 min-h-40 flex-col gap-2">
          <p>{resSi()} empresas van respondiendo a tus solicitudes:</p>
          <div className="flex flex-row w-full gap-2 flex-wrap my-2 mb-6">
            {empresasSi().map((data) => (
              <div key={data.empresa}>
                <Badge>{data}</Badge>
              </div>
            ))}
          </div>
        </div>

      </section>
      <section>
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
                <Dialog>
                  <DialogTrigger className={`${buttonVariants({ variant: 'secondary' })} text-xs `}>Ver detalles</DialogTrigger>
                  <DialogContent>
                    <DialogHeader className='text-left gap-2'>
                      <DialogTitle>{data.empresa}</DialogTitle>
                      <DialogDescription>
                        Aplicaste para el puesto de {data.tituloPuesto} el {data.fecha} en {data.postuleEn}.
                      </DialogDescription>

                      <DialogDescription>
                        Respondieron: {data.respondieron}
                      </DialogDescription>

                      <DialogDescription>
                        Entrevista: {data.entrevista}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))
        }

      </section>
    </main >
  );
}
