const manageSpinner = (status) => {
    if (status === true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    } else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden");
    }
}; 
const displayLesson = (data) => {
    const lessonContainer = document.getElementById("level-container");
    lessonContainer.innerHTML = "";
    for (let lesson of data){
        const btnDiv = document.createElement("div");
        console.log(lesson);
        btnDiv.innerHTML = `<button onclick="loadLevelWord(${lesson.level_no})" id="lesson-${lesson.level_no}" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>`;
        lessonContainer.append(btnDiv);
    }
     manageSpinner(false);
};

const loadLessons = () => {
    
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};


loadLessons();


const loadLevelWord = (id) => {
    manageSpinner(true);
    const selectedBtn = document.getElementById(`lesson-${id}`);
    console.log(selectedBtn);
    document.querySelectorAll(".active").forEach((btn) => btn.classList.remove("active"));
    selectedBtn.classList.add("active");
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then( (res) => res.json())
    .then( (data) => displayWords(data.data));
};
const displayWords = (words) => {
    
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if (words.length === 0){
        wordContainer.innerHTML = `<div class="col-span-full text-center">
          <img class = "mx-auto" src = "./assets/alert-error.png">
          <h1 class="bangla-font">আপনি এখনো কোন Lesson Select করেন নি</h1>
          <p class="text-2xl">একটি Lesson Select করুন।</p>
        </div>`;
    }
    for (let word of words){
        console.log(word.word);
        const card = document.createElement("div");
        card.innerHTML = `<div class="bg-white text-center rounded-xl shadow-sm py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word?word.word:"N/A"}</h2>
        <p class="font-semibold">Meaning/Pronunciation</p>
        <div class="text-2xl font-medium bangla-font">${word.meaning?word.meaning:"Not Found"}/${word.pronunciation?word.pronunciation:"Not Found"}</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
        </div>

      </div>`;
        wordContainer.append(card);
        manageSpinner(false);
    }
    
};
const loadWordDetail = (id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        displayWordDetail(data.data);
    });
};
const createElements = (synonyms) => {
    const htmlElements = synonyms.map((el) => `<span class = "btn">${el}</span>`);
    return htmlElements.join(" ");
}
const displayWordDetail = (word) => {
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML =` <div class="">
            <h2 class="text-2xl font-bold">
        ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Synonym</h2>
            <div class="">${createElements(word.synonyms)}</div>
          </div>`;

    document.getElementById("word_modal").showModal();
};

