//? Selectors

const ekleBtn = document.getElementById("ekle-btn")
const gelirInput = document.getElementById("gelir-input")
const ekleFormu = document.getElementById("ekle-formu")


const gelirinizTd = document.getElementById("geliriniz")
const giderinizTd = document.getElementById("gideriniz")
const kalanTd = document.getElementById("kalan")

//? Variables

let gelirler = 0

//?Ekle Formu

window.addEventListener("load", ()=>{
    gelirler = localStorage.getItem("gelirler") || 0
    gelirinizTd.textContent = gelirler
})

ekleFormu.addEventListener("submit",(e)=>{
    e.preventDefault()
    gelirler = gelirler + +(gelirInput.value)
    console.log(gelirler)
    ekleFormu.reset()
    localStorage.setItem("gelirler", gelirler)
    gelirinizTd.textContent = gelirler
})


//? Harcama Formu 

const harcamaFormu = document.getElementById("harcama-formu")
const tarihInput = document.getElementById("tarih")
const miktarInput = document.getElementById("miktar")
const harcamaAlaniInput = document.getElementById("harcama-alani")

const harcamaBody = document.getElementById("harcama-body")
const temizleBtn = document.getElementById("temizle-btn")

harcamaFormu.addEventListener("submit",(e)=>{
    const yeniHarcama = {
        tarih: tarihInput.value,
        miktar: miktarInput.value,
        alan: harcamaAlaniInput.value,
        id: new Date().getTime()

    }

    /* console.log(yeniHarcama) */
    harcamaListesi.push(yeniHarcama)
    console.log(harcamaListesi);
    localStorage.setItem("harcamalar", JSON.stringify(harcamalarListesi))
    
    harcamaFormu.reset()
    tarihInput.valueAsDate = new Date()
})