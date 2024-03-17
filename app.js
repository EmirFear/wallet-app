//? Selectors

const ekleBtn = document.getElementById("ekle-btn")
const gelirInput = document.getElementById("gelir-input")
const ekleFormu = document.getElementById("ekle-formu")

const gelirinizTd = document.getElementById("geliriniz")
const giderinizTd = document.getElementById("gideriniz")
const kalanTd = document.getElementById("kalan")

//? Variables

let gelirler = 0;
let harcamaListesi = []

//*Ekle Formu

window.addEventListener("load", () => {
  gelirler = localStorage.getItem("gelirler") || 0
  harcamaListesi = JSON.parse(localStorage.getItem("harcamalar")) || []

  harcamaListesi.forEach(harcama =>{
    harcamayiDomaYaz(harcama)
  })

  gelirinizTd.textContent = gelirler
  hesaplaVeGuncelle()
  tarihInput.valueAsDate = new Date()

});

ekleFormu.addEventListener("submit", (e) => {
  e.preventDefault()
  gelirler = gelirler + +gelirInput.value;
  console.log(gelirler)
  ekleFormu.reset()
  localStorage.setItem("gelirler", gelirler);
  hesaplaVeGuncelle()
  
})

//! Harcama Formu

const harcamaFormu = document.getElementById("harcama-formu");
const tarihInput = document.getElementById("tarih");
const miktarInput = document.getElementById("miktar");
const harcamaAlaniInput = document.getElementById("harcama-alani");

const harcamaBody = document.getElementById("harcama-body");
const temizleBtn = document.getElementById("temizle-btn");

harcamaFormu.addEventListener("submit", (e) => {
  e.preventDefault(); //! Reload engelleme için (sumbit gönderildiğinde sayfaya kaydetmez)
  const yeniHarcama = {
    tarih: tarihInput.value,
    miktar: miktarInput.value,
    alan: harcamaAlaniInput.value,
    id: new Date().getTime(),
  }

  /* console.log(yeniHarcama) */
  harcamaListesi.push(yeniHarcama);
  console.log(harcamaListesi);
  localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi));

  harcamayiDomaYaz(yeniHarcama)
  harcamaFormu.reset();
  tarihInput.valueAsDate = new Date();
  hesaplaVeGuncelle()

})



//& Harcamayı HTMLe yazdık

const harcamayiDomaYaz = ({id, miktar, tarih, alan}) =>{
    const tr = document.createElement("tr")

    const appendTd = (content)=>{
        const td = document.createElement("td")
        td.textContent = content;
        return td
    }

    const createLastTd = () =>{
        const td = document.createElement("td")
        const iElement = document.createElement("i")
        iElement.id = id
        iElement.className = "fa-solid fa-trash-can text-danger"
        iElement.type = "button"
        td.appendChild(iElement)
        return td


    }

    tr.append(
        appendTd(tarih), //tarih td si
        appendTd(alan), //alan td si
        appendTd(miktar), //miktar td si
        createLastTd() // Çöp kutusu ve id yi ekler
    )
    
    harcamaBody.append(tr) //& son girileni alta ekler
    // harcamaBody.prepend(tr) //& son girileni öne ekler
    
}



//& hesapla ve güncelle
const hesaplaVeGuncelle = ()=>{
  const giderler = harcamaListesi.reduce(
    (toplam, harcama) => toplam + Number(harcama.miktar),0
  )


  giderinizTd.textContent = giderler
  gelirinizTd.textContent = gelirler
  kalanTd.textContent = gelirler - giderler
}
