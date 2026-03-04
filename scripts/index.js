
const displayLesson = (data) => {
    const lessonContainer = document.getElementById("level-container");
    lessonContainer.innerHTML = "";
    for (let lesson of data){
        const btnDiv = document.createElement("div");
        console.log(lesson);
        btnDiv.innerHTML = `<button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>`;
        lessonContainer.append(btnDiv);
    }
};
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};


loadLessons();


const loadLevelWord = (id) => {
    
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
        card.innerHTML = `   <div class="bg-white text-center rounded-xl shadow-sm py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word?word.word:"N/A"}</h2>
        <p class="font-semibold">Meaning/Pronunciation</p>
        <div class="text-2xl font-medium bangla-font">${word.meaning?word.meaning:"Not Found"}/${word.pronunciation?word.pronunciation:"Not Found"}</div>
        <div class="flex justify-between items-center">
          <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
        </div>

      </div>`;
        wordContainer.append(card);
    }
    
};

