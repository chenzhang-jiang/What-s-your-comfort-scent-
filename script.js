const products = {
  vanilla:{name:'Vanilla Sunday',family:'Gourmand',price:'CA$35',size:'30ml',notes:'Madagascar vanilla · tonka bean · soft amber',desc:'A warm, comforting gourmand with creamy sweetness and a soft amber finish.',image:'images/lifestyle-vanilla.jpg'},
  petal:{name:'Petal Rain',family:'Floral',price:'CA$35',size:'30ml',notes:'Rose · peony · lily of the valley',desc:'A fresh floral with luminous petals and a light, easy softness.',image:'images/lifestyle-petal.png'},
  orange:{name:'Orange Grove',family:'Fruity Citrus',price:'CA$35',size:'30ml',notes:'Mandarin · bergamot · pear',desc:'A bright citrus-fruit scent with a clean, playful finish.',image:'images/lifestyle-orange.png'},
  white:{name:'White Morning',family:'Soft Musk',price:'CA$35',size:'30ml',notes:'White musk · iris · cotton blossom',desc:'An airy, skin-close musk with a clean and effortless finish.',image:'images/lifestyle-white.png'},
  cedar:{name:'Cedar Quiet',family:'Woody',price:'CA$35',size:'30ml',notes:'Cedarwood · sandalwood · vetiver',desc:'A calm woody scent with dry cedar, smooth sandalwood and grounding vetiver.',image:'images/lifestyle-cedar.png'}
};

const profiles = {
  kitchen: {
    name: "Warm Kitchen",
    tagline: "You gravitate toward warm gourmand scents.",
    description: "Your profile is drawn to enveloping sweetness, familiar warmth and soft edible notes. Vanilla, tonka bean and amber are a strong place to start.",
    notes: ["Vanilla", "Tonka bean", "Soft amber"],
    image: "images/warm-kitchen.jpg",
    productKey: "vanilla"
  },
  garden: {
    name: "Blooming Garden",
    tagline: "You gravitate toward luminous floral scents.",
    description: "Your profile is drawn to expressive florals that feel fresh, bright and easy to wear. Rose, peony and delicate white flowers suit your preferences.",
    notes: ["Rose", "Peony", "Lily of the valley"],
    image: "images/blooming-garden.jpg",
    productKey: "petal"
  },
  orchard: {
    name: "Citrus Orchard",
    tagline: "You gravitate toward juicy, energetic scents.",
    description: "Your profile favors bright citrus and fruit notes with a clean, playful finish. Mandarin, bergamot and pear are likely to feel natural on you.",
    notes: ["Mandarin", "Bergamot", "Pear"],
    image: "images/citrus-orchard.jpg",
    productKey: "orange"
  },
  linen: {
    name: "Morning Linen",
    tagline: "You gravitate toward clean, skin-close scents.",
    description: "Your profile prefers fragrance that feels airy, understated and effortless. White musk, iris and cotton blossom create the soft finish you naturally reach for.",
    notes: ["White musk", "Iris", "Cotton blossom"],
    image: "images/morning-linen.jpg",
    productKey: "white"
  },
  woods: {
    name: "Quiet Woods",
    tagline: "You gravitate toward grounded woody scents.",
    description: "Your profile leans toward dry woods, soft musk and warm natural textures. Cedarwood, sandalwood and vetiver give you a calm, balanced starting point.",
    notes: ["Cedarwood", "Sandalwood", "Vetiver"],
    image: "images/quiet-woods.jpg",
    productKey: "cedar"
  }
};

const questions = [
  {q:"Which setting feels most naturally comforting to you?",options:[
    ["kitchen","A warm kitchen after dessert","Familiar sweetness and soft evening light"],
    ["garden","A garden in full bloom","Petals, color and fresh air"],
    ["orchard","A bright orchard in the sun","Fruit, grass and easy energy"],
    ["linen","Fresh sheets beside an open window","Clean air and quiet morning light"],
    ["woods","A bench under tall trees","Cool shade, books and stillness"]]},
  {q:"Which fragrance direction sounds most appealing?",options:[
    ["kitchen","Warm and softly sweet","Vanilla, amber, tonka"],
    ["garden","Fresh and floral","Rose, peony, white flowers"],
    ["orchard","Bright and juicy","Citrus, pear, mandarin"],
    ["linen","Clean and skin-like","White musk, iris, cotton blossom"],
    ["woods","Dry and grounded","Cedar, sandalwood, vetiver"]]},
  {q:"What do you want your everyday scent to feel like?",options:[
    ["linen","Effortless and close to the skin","Something soft enough for every day"],
    ["orchard","Fresh and energizing","A scent that lifts the mood of the moment"],
    ["garden","Expressive but still easy","A little more presence without feeling formal"],
    ["woods","Calm and grounded","Warm texture without sweetness"],
    ["kitchen","Comforting and enveloping","A gentle sweetness that feels familiar"]]},
  {q:"Which detail would make you stop and notice a scent?",options:[
    ["garden","A bouquet of fresh-cut flowers","Petals and green stems"],
    ["orchard","Citrus peel in the air","Bright, tart and juicy"],
    ["kitchen","Vanilla warming in a kitchen","Sweet, soft and familiar"],
    ["linen","Fresh fabric in sunlight","Clean, airy and subtle"],
    ["woods","Dry wood after rain","Natural, textured and quiet"]]},
  {q:"Which one sounds most like something you would actually wear?",options:[
    ["kitchen","A warm vanilla with amber underneath","Comforting, not sugary"],
    ["garden","A fresh floral with soft green edges","Bright, not powdery"],
    ["orchard","A juicy citrus-fruit blend","Fresh, not sharp"],
    ["linen","A clean white musk","Soft, not soapy"],
    ["woods","A smooth cedar-sandalwood blend","Grounded, not heavy"]]}
];

let current=0;
let scores={kitchen:0,garden:0,orchard:0,linen:0,woods:0};
let latestResult=null;
let activeProductKey=null;
let productSource='home';
const quizShell=document.getElementById('quizShell');
const resultShell=document.getElementById('resultShell');
const productShell=document.getElementById('productShell');
const quizCard=document.getElementById('quizCard');
const quizStep=document.getElementById('quizStep');
const progressFill=document.getElementById('progressFill');

function resetScroll(){window.scrollTo({top:0,behavior:'auto'});}
function hideOverlays(){quizShell.classList.add('hidden');resultShell.classList.add('hidden');productShell.classList.add('hidden');}
function openQuiz(){
  current=0;scores={kitchen:0,garden:0,orchard:0,linen:0,woods:0};
  hideOverlays();quizShell.classList.remove('hidden');document.body.style.overflow='hidden';renderQuestion();
}
function backHome(){hideOverlays();document.body.style.overflow='';location.hash='home';resetScroll();}

document.querySelectorAll('[data-start-quiz]').forEach(b=>b.addEventListener('click',openQuiz));
document.getElementById('quizHome').addEventListener('click',backHome);
document.getElementById('backHome').addEventListener('click',backHome);
document.getElementById('restartQuiz').addEventListener('click',openQuiz);

function renderQuestion(){
  const item=questions[current];
  quizStep.textContent=`${current+1} / ${questions.length}`;
  progressFill.style.width=`${((current+1)/questions.length)*100}%`;
  quizCard.innerHTML=`<p class="eyebrow">QUESTION ${String(current+1).padStart(2,'0')}</p><h2 class="quiz-question">${item.q}</h2><div class="answer-grid">${item.options.map(([key,title,sub])=>`<button class="answer-btn" data-key="${key}"><strong>${title}</strong><span>${sub}</span></button>`).join('')}</div>`;
  quizCard.querySelectorAll('.answer-btn').forEach(btn=>btn.addEventListener('click',()=>{scores[btn.dataset.key]++;current++;if(current<questions.length)renderQuestion();else showResult();}));
}
function showResult(){
  const max=Math.max(...Object.values(scores));
  const key=Object.keys(scores).find(k=>scores[k]===max);
  const p=profiles[key];const product=products[p.productKey];latestResult=key;activeProductKey=p.productKey;
  document.getElementById('resultName').textContent=p.name;
  document.getElementById('resultTagline').textContent=p.tagline;
  document.getElementById('resultDescription').textContent=p.description;
  document.getElementById('resultNotes').innerHTML=p.notes.map(n=>`<span class="note-chip">${n}</span>`).join('');
  document.getElementById('matchProduct').textContent=product.name;
  document.getElementById('matchMeta').textContent=`${product.family} · ${product.price} · ${product.size}`;
  const img=document.getElementById('resultImage');img.src=p.image;img.alt=`${p.name} scent profile`;
  quizShell.classList.add('hidden');resultShell.classList.remove('hidden');
  document.getElementById('emailForm').classList.remove('hidden');
  document.getElementById('successMessage').classList.add('hidden');
  localStorage.setItem('lapinComfortScent',key);
}

function openProduct(key,source='home'){
  const p=products[key];if(!p)return;
  activeProductKey=key;productSource=source;hideOverlays();
  document.getElementById('productFamily').textContent=p.family.toUpperCase();
  document.getElementById('productName').textContent=p.name;
  document.getElementById('productNotes').textContent=p.notes;
  document.getElementById('productDesc').textContent=p.desc;
  document.getElementById('productPrice').textContent=p.price;
  document.getElementById('productSize').textContent=p.size;
  const image=document.getElementById('productLifestyle');image.src=p.image;image.alt=`${p.name} lifestyle image`;
  productShell.classList.remove('hidden');document.body.style.overflow='hidden';
}

document.querySelectorAll('[data-open-product]').forEach(btn=>btn.addEventListener('click',()=>openProduct(btn.dataset.openProduct,'home')));
document.getElementById('matchCard').addEventListener('click',()=>{if(activeProductKey)openProduct(activeProductKey,'result');});
document.getElementById('productBack').addEventListener('click',()=>{
  productShell.classList.add('hidden');
  if(productSource==='result'){resultShell.classList.remove('hidden');}
  else{document.body.style.overflow='';}
});
document.getElementById('shopAllFromProduct').addEventListener('click',()=>{hideOverlays();document.body.style.overflow='';});

document.getElementById('emailForm').addEventListener('submit',e=>{
  e.preventDefault();
  const email=document.getElementById('email').value.trim();
  const consent=document.getElementById('consent').checked;
  if(!email||!consent)return;
  localStorage.setItem('lapinEmail',email);if(latestResult)localStorage.setItem('lapinComfortScent',latestResult);
  document.getElementById('successMessage').classList.remove('hidden');e.currentTarget.classList.add('hidden');
});
