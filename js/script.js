
const buttonList = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const dataFocus = data.data;
   
    console.log(dataFocus);
    buttonSet(dataFocus);
    categoryLoad(dataFocus[0].category_id)
}

const buttonSet = (btn) => {
    const btnList = document.getElementById('btn-list');
    btn.forEach(element => {
        // var butColorId = element;
        const button = document.createElement('button');
        button.classList = 'bg-gray-200 mx-2 py-2 px-4 mb-5 active:bg-violet-700 font-semibold rounded-md  focus:text-white'
        button.id = `hello${element.category_id}`;
        button.onclick = `category(${element.category_id})`;
        button.setAttribute(`onclick`, `categoryLoad(${element.category_id})`);
        button.innerText = `${element.category}`
        btnList.appendChild(button);
        console.log(button); 
    });

}

// .....................................................

const categoryLoad = async (id) => {

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    const dataFocus2 = data.data;
    console.log(dataFocus2);

    const cardSection2 = document.getElementById('card-section2');
    cardSection2.innerHTML = '';
    if (dataFocus2.length === 0) {
        const opsDiv = document.createElement('div');
        opsDiv.classList = 'mt-40';
        opsDiv.innerHTML = `
        <div class="flex justify-center">
            <img class="" src="/image/Icon.png">
        </div>
        <h3 class="text-4xl font-bold text-center mt-10" >Oops!! Sorry, There is no </br> content here</h3>
        `;
        cardSection2.appendChild(opsDiv);
    }
    document.getElementById('short-by-all').addEventListener('click', function () {
       let hellox = dataFocus2.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));
       cardFunction(hellox);
    })
    cardFunction(dataFocus2);
}
const cardFunction = (load) => {
    const cardSection = document.getElementById('card-section');
    cardSection.innerHTML = '';
    load.forEach(element => {
//--------------time---------section
        const time = element.others.posted_date;
        let hour= parseFloat(time)/3600;
        let minit=parseFloat(time)%60;
        if(time>0){
            count =parseInt(hour)+" "+"hrs"+" "+parseInt(minit)+" "+"min"+" "+"ago";
             mainTime =`<p class="absolute bg-[#171717] text-white bottom-32 right-2 px-2 rounded-md">${count}</p>`
        }
        else{
            count='';
            mainTime='';
        }
        const div = document.createElement('div');
        div.classList = 'max-w-7xl m-auto bg-base-100 rounded-lg mt-5 relative';
        div.innerHTML = `
        <figure>
            <img class="w-80 h-48 m-auto rounded-lg" src="${element.thumbnail}" />
            <div>
            ${mainTime}
            </div>
        </figure>
            <div class="flex gap-4 mt-4 pl-5">
                <div>
                    <img class="w-10 rounded-full h-10" src="${element.authors[0].profile_picture}" >
                </div>
                <div>
                    <h1 class="text-lg font-bold">${element.title}</h1>
                    <div class="flex">
                    <div class="flex mt-2 gap-3">
                    <p class="  text-[rgba(23, 23, 23, 0.70);]">${element.authors[0].profile_name}</p>
                    <p><img class="w-5 rounded-full h-5" src="/image/verify.png" ${element.authors[0].verified ? '' : 'hidden'}></p>
                    </div>
                    </div>
                    <p class=" mt-2 mb-4">${element.others.views} Views</p>
                </div>
            </div>
        `;
        cardSection.appendChild(div);
    });
}



// ----------------------------------------------------------------------------------
const page = () => window.location.href = "/index/page2.html"
const home = () => window.location.href = "/index.html"



buttonList();

// const shortArray = [];
//         dataFocus2.forEach(element1 => {
//             shortArray.push(parseFloat(element1.others.views))
//         })
//         shortArray.sort(function (a, b) { return b - a });
//         console.log(shortArray);
//         cardFunction(shortArray);

