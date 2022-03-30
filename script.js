const url = `https://guarded-hamlet-24255.herokuapp.com/todo4`;

//透過 API 取得 data

const todoList = document.querySelector(".todos-content-list")

const getData = async function() {
    const response = await fetch(url);
    const items = await response.json();
    let str = "";
    items.forEach( item => {
        str+=`<li data-id="${item.id}">
            <label>
                <input type="checkbox"></input>
                <span> ${item.content} </span>
            </label>
            <a class="btn-del" href="#">
                <i class="fa fa-times"></i>
            </a>
        </li>`
    });
    todoList.innerHTML = str;

    // 沒有任何 todo 時的預設文字
    if ( todoList.childElementCount === 0) {
        let str = `<li><p class="text-info">目前沒有任何待辦事項</p></li>`;
        todoList.innerHTML = str;
    }
}

getData();

// 新增 todo
const btnAdd = document.querySelector(".btn-add");
const userInput = document.querySelector(".userInput");

function addItem() {
    let input = userInput.value;
    if (input.length > 0){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
            "content": `${input}`,
            "status": false
        });
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        fetch("https://guarded-hamlet-24255.herokuapp.com/todo4", requestOptions)
        .then(response => response.text())
        .then(result => {
            alert("新增成功！");
            userInput.value = "";
            getData();
        })
        .catch(error => console.log('error', error));
    } else {
        alert("請輸入內容");
    }
}

btnAdd.addEventListener("click", addItem);


// 刪除 todo

// const btnDel = document.querySelector(".btn-del");
// btnDel.addEventListener("click", delItem);

todoList.addEventListener("click", function(event){
    // let target = event.target;
    // if (target.className === "btn-del") {
    //     alert("yoyoyoy");
    // }
    if (event.target.getAttribute("class") === "fa fa-times") {
        let id = event.target.parentElement.getAttribute("data-id");
        
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };
          
        fetch(`https://guarded-hamlet-24255.herokuapp.com/todo4/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        alert("已刪除");
        getData();
    }
});


//更新 todo status

const getItem = async function (id) {
    const res = await fetch(url);
    const items = await res.json();
    items.forEach( i => {
        this.id = i
    })
    console.log(items);
};

todoList.addEventListener("click", function (e){
    let target = e.target;
    if (target.tagName === "INPUT") {
        let id = target.parentElement.parentElement.getAttribute("data-id");
        let status = target.getAttribute("checked");
        let content = target.nextSibling.textContent;
        console.log (`click input: id=${id}, status=${status} ,content:${content}`);

        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        
        // var raw = JSON.stringify({
        //   "content": "今天要上課",
        //   "status":${checked},
        //   "id": ${id}
        // });
        
        // var requestOptions = {
        //   method: 'PATCH',
        //   headers: myHeaders,
        //   body: raw,
        //   redirect: 'follow'
        // };
        
        // fetch(`https://guarded-hamlet-24255.herokuapp.com/todo4/${id}`, requestOptions)
        //   .then(response => response.text())
        //   .then(result => console.log(result))
        //   .catch(error => console.log('error', error));
    }
});
