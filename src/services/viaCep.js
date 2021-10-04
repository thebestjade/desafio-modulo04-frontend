async function getCityByCep(cep) {

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            method: 'GET'
        });
        
        const data = await response.json()

        const { localidade, logradouro, bairro, uf, erro } = data;

        if (erro) {
            return false;
        }

        return {localidade, logradouro, bairro, uf};
    } catch (error) {
        return false;
    }
}
export default getCityByCep;