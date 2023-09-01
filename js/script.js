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
    cardSection.innerHTML='';
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    const dataFocus2 = data.data;
    console.log(dataFocus2);

    
    dataFocus2.forEach(element => {
        console.log(element)
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
                    <p class=" mt-2 text-[rgba(23, 23, 23, 0.70);]">${element.authors[0].profile_name}</p>
                    <p></p>
                    </div>
                    <p class=" mt-2 mb-4">${element.others.views} Views</p>
                </div>
            </div>
        `;
        cardSection.appendChild(div);
    });
    
}


buttonList();