const api = {
    jobs: {
        list: async info => {
            return await fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQEawQE4WjBupoMl0G2MIl58AdHDluQ8y_l3qIeDOUUVATkaH4RzP2iYuAcXr4KMtP4UdxrHO5cqzxL/pub?output=csv`,
                { next: { tags: ["jobs"] } }
            )
                .then((res) => res.text())
                .then(text => {
                    return text
                        .split("\n")
                        .slice(1)
                        .map(row => {
                            const [fecha, empresa, tituloPuesto, postuleEn, respondieron, entrevista] = row.split(",");
                            return {
                                fecha,
                                empresa,
                                tituloPuesto,
                                postuleEn,
                                respondieron,
                                entrevista
                            };
                        });
                })

        }
    }
}



export default api