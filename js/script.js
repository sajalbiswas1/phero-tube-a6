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
        button.classList='bg-gray-200 mx-2 py-2 px-4 font-semibold rounded-md focus:bg-red-500 focus:text-white'
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
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    const dataFocus2 = data.data;
    console.log(dataFocus2);

    const cardSection = document.getElementById('card-section');
    dataFocus2.forEach(element => {
        console.log(element)
        const div = document.createElement('div');
        div.classList = 'card w-96 bg-base-100 ';
        div.innerHTML=`
        <figure><img src="${element.thumbnail}" /></figure>
                <div class="card-body flex">
                    <div>
                        <img src="" >
                    </div>
                    <div>
                        <h1>title</h1>
                        <p>nam</p>
                        <p>view</p>
                    </div>
                </div>
        `;
        cardSection.appendChild(div);
    });
    
}


buttonList();