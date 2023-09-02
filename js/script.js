const buttonList = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const dataFocus = data.data;
    console.log(dataFocus);
    buttonSet(dataFocus);
}

const buttonSet = (btn)=>{
    const btnList = document.getElementById('btn-list');
    btn.forEach(element => {
        const button = document.createElement('button');
        button.classList='bg-gray-200 mx-2 py-2 px-4 mb-5 font-semibold rounded-md focus:bg-red-500 focus:text-white'
        button.id=`hello ${element.category_id}`;
        button.onclick=`category(${element.category_id})`;
        button.setAttribute(`onclick`,`categoryLoad(${element.category_id})`);
        button.innerText=`${element.category}`
        btnList.appendChild(button);
        console.log(button);
    });
   
}
// .....................................................

const categoryLoad = async (id) => {
    const cardSection = document.getElementById('card-section');
    const cardSection2 = document.getElementById('card-section2');
    cardSection.innerHTML='';
    cardSection2.innerHTML='';
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    const dataFocus2 = data.data;
    if(dataFocus2.length === 0){
        const opsDiv = document.createElement('div');
        opsDiv.classList = 'mt-40';
        opsDiv.innerHTML=`
        <div class="flex justify-center">
            <img class="" src="/image/Icon.png">
        </div>
        <h3 class="text-4xl font-bold text-center mt-10" >Oops!! Sorry, There is no </br> content here</h3>
        `;
        console.log(opsDiv.innerHTML);
        cardSection2.appendChild(opsDiv);
    }

    
    dataFocus2.forEach(element => {
        const div = document.createElement('div');
        div.classList = 'max-w-7xl m-auto bg-base-100 shadow-2xl rounded-lg mt-5 ';
        
        div.innerHTML=`
        <figure>
            <img class="w-80 h-48 m-auto rounded-lg" src="${element.thumbnail}" />
        </figure>
            <div class="flex gap-4 mt-4">
                <div>
                    <img class="w-10 rounded-full h-10" src="${element.authors[0].profile_picture}" >
                </div>
                <div>
                    <h1 class="text-lg font-bold">${element.title}</h1>
                    <div class="flex">
                    <div class="flex mt-2 gap-3">
                    <p class="  text-[rgba(23, 23, 23, 0.70);]">${element.authors[0].profile_name}</p>
                    <p><img class="w-5 rounded-full h-5" src="/image/verify.png" ${element.authors[0].verified?'':'hidden'}></p>
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

buttonList();