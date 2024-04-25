function changePageTitle(title) {
    document.title = title
  }
  
  function generateInfoSection(src, nomeCidade) {
    const h2 = document.createElement('h2')
    h2.id = "info-cidade-label"
    h2.textContent = `Informações sobre ${nomeCidade}`
  
    const section = document.querySelector('#info-cidade')
  
    section.appendChild(h2)
  }
  
  async function getNomeCidade(name) {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/{uf}/municipios 
    ${name}`)
       .then((fetchData) => {
         return fetchData.json()
       })
       .then((jsonData) => generateInfoSection(jsonData.sprites.front_default, name))
       .catch((error) => console.error(error))
  
    try {
      const data = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/{uf}/municipios 
      ${name}`)
  
      const jsonData = await data.json()
  
      generateInfoSection(jsonData.sprites.front_default, name)
    } catch (error) {
      console.error(error)
    }
  }
  
  function getSearchParams() {
    if (!location.search) {
      return
    }
  
    const urlSearchParams = new URLSearchParams(location.search)
  
    const nomeCidade = urlSearchParams.get('name')
  
    changePageTitle(`${nomeCidade}`)
    getNomeCidade(nomeCidade)
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    getSearchParams()
  })