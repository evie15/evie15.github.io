window.onload=function(){
    adduser("1");
    var xhr=new XMLHttpRequest()
        xhr.open('get','http://43.140.247.80:8080/index/block'); 
        xhr.setRequestHeader("Content-Type", "application/json");
        if(token!=='undefined'){
            xhr.setRequestHeader("Authorization",token);
        }
        xhr.send();
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                console.log(res);
                addPlate(res.data);
          if(token!=='undefined'){
        var navi=`<ul>
        <li>
            <div class="user_ph"><img src="${res.data.idPhoto}" alt="">
            <p>${res.data.nickName}</p> 
            </div>
        </li>
        
        <li><a href="../../user/loginhome/login.html"><button id="chosed">首 页</button></a></li>
        <li></li>
        <li><a href="plate.html"><button id="chosed">板 块</button></a>  </li>
        <li><a href="alluser.html"><button>用 户</button></a>  </li>
        <li></li>
        <li></li>
        <li><p class="out" onclick="out()">退出登录</p></li>
        <li></li>
    </ul>`
    document.getElementsByClassName('navi')[0].innerHTML=navi;
    }
            }}
}
function adduser(index){
    var token=localStorage.getItem("token");
    var xhr=new XMLHttpRequest()
        xhr.open('get','http://43.140.247.80:8080/user/all/'+index); 
        xhr.setRequestHeader("Content-Type", "application/json");
        if(token!=='undefined'){
            xhr.setRequestHeader("Authorization",token);
        }
        xhr.send();
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                console.log(res);
                
                var xhr2=new XMLHttpRequest()
                xhr2.open('get','http://43.140.247.80:8080/index/block'); 
                xhr2.setRequestHeader("Content-Type", "application/json");
                xhr2.setRequestHeader("Authorization",token);
                xhr2.send();
                xhr2.onreadystatechange=function(){
              if(xhr2.readyState===4&&xhr2.status===200){
                var res2=JSON.parse(xhr.responseText);
                var xhr3=new XMLHttpRequest()
                xhr3.open('get','http://43.140.247.80:8080/block/manage'); 
                xhr3.setRequestHeader("Content-Type", "application/json");
                xhr3.setRequestHeader("Authorization",token);
                xhr3.send();
                xhr3.onreadystatechange=function(){
              if(xhr3.readyState===4&&xhr3.status===200){
                var res3=JSON.parse(xhr.responseText);
                for(let j=0;j<`${res.data.list.length}`;j++){
                var everyPlate=``
                for(let i=0;i<`${res3.data.list.length}`;i++){
                    everyPlate+=`<li><a href="#" onclick="managePlate(${res.data.list[j].id},${res3.data.list[i].id})">${res3.data.list[i].id}</a></li>`
                }
                everyPlate+=` <li role="presentation" class="divider"></li>`
                for(let i=0;i<`${res2.data.list.length}`;i++){
                    everyPlate+=`<li><a href="#" onclick="managePlate(${res.data.list[j].id},${res2.data.list[i].id})">${res2.data.list[i].id}</a></li>`
                }
                var ul=document.createElement('ul');
                ul.className='dropdown-menu';
                ul.innerHTML=everyPlate;
                
                var btn=`<button type="button" class="btn btn-default dropdown-toggle cancel" data-toggle="dropdown">
                管理<span class="caret"></span>
            </button>`;
                var plate1=btn+ul.outerHTML;
                
                var plate2=document.createElement('div');
                plate2.className='btn-group-vertical';
                plate2.innerHTML=plate1;
        if(`${res.data.list[j].banStatus}`==0){
           var person_post2=`
            <div class="col-md-1">
                <img src="${res.data.list[j].idPhoto}" />
            </div>
            <div class="col-md-11">
                <div class="post_title">${res.data.list[j].nickName}</div>
                    <button class="cancel" onclick="ban(${res.data.list[j].id})">封禁</button>
                <span class="friend">电话 ${res.data.list[j].telephone}</span> 
            </div>`
        }
        else{
           var person_post2=`
            <div class="col-md-1">
                <img src="${res.data.list[j].idPhoto}" />
            </div>
            <div class="col-md-11">
                <div class="post_title">${res.data.list[j].nickName}
                    <button class="cancel" onclick="ban(${res.data.list[j].id})">解封</button>
                </div>
                <span class="friend">电话 ${res.data.list[j].telephone}</span> 
            </div>`
        }
console.log(person_post2);
              var plate3=person_post2+plate2.outerHTML;
              var person_post3=document.createElement('div');
              person_post3.className='person_post2';
              person_post3.innerHTML=plate3;
            document.getElementsByClassName('content')[0].innerHTML+=person_post3.outerHTML;
        }
        }
    }
}
    }
    var defalutPager={
        currentPage:1,
        pageSize:8,
        divNumber:1,
        total:0,
        pageNumber:0,
        }
        var pager=Object.assign(defalutPager,pager);
    createPager(pager,res.data);
    addnumber1(pager);
    blidEvent(pager);
        }}

   
   
            
        
}
function createPager(pager,data){
    pager.total=data.totalPage;
    pager.pageSize=data.pageSize;
    pager.currentPage=data.currentPage;
    pager.pageNumber=Math.ceil(pager.total/data.pageSize);
}
function addnumber1(pager){
    var item=``;
    var pagenum=``;
    for(let i=0;i<pager.pageNumber;i++){
        if(i==pager.currentPage-1){
            pagenum+=`<li><a href="#" class="num"  style="background-color: rgb(236, 236, 236);">${i+1}</a></li>`
        }
        else{
            pagenum+=`<li><a href="#" class="num">${i+1}</a></li>`
        }
        
    }
    if(pager.currentPage!==1){
      item=`<li><a href="#" class="prev">&laquo;</a></li>`;
      pagenum=item+pagenum;
    }
    if(pager.currentPage!==pager.pageNumber){
      item=` <li><a href="#" class="next">&raquo;</a></li>`
      pagenum=pagenum+item;
    }
      document.getElementsByClassName('pagination')[0].innerHTML=pagenum;
    
    }
    function blidEvent(pager){
        document.getElementsByClassName('pagination')[0].addEventListener('click',function(e){
       var classlist=e.target.getAttribute('class');
       if(classlist.search('prev')!==-1){
           toPage(pager.currentPage-1,pager);
       }
       else if(classlist.search('next')!==-1){
         toPage(pager.currentPage+1,pager);
       }
       else if(classlist.search('num')!==-1){
         var num=e.target.innerHTML;
         console.log(num)
         toPage(num,pager);
       }
     })
     }
     //跳转页码
     function toPage(page,pager){
       if(page<1){
         page=1;
       }
       else if(page>pager.pageNumber){
         page=pager.pageNumber;
       }
       pager.currentPage=page;
       addComment(pager.currentPage);
     }
function ban(userId){
    var token=window.localStorage.getItem("token")
    var xhr=new XMLHttpRequest()
        xhr.open('get','http://43.140.247.80:8080/user/update/ban/'+userId); 
        xhr.setRequestHeader("Content-Type", "application/json");
        if(token!=='undefined'){
            xhr.setRequestHeader("Authorization",token);
        }
        xhr.send();
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                window.location.reload();
            }
        }
}
function managePlate(userid,blockid){
    var token=window.localStorage.getItem("token")
    var xhr=new XMLHttpRequest()
        xhr.open('get','http://43.140.247.80:8080/user/update/master/'+userid+'/'+blockid); 
        xhr.setRequestHeader("Content-Type", "application/json");
        if(token!=='undefined'){
            xhr.setRequestHeader("Authorization",token);
        }
        xhr.send();
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                console.log(res.data)
            }
        }
}
function search(){
    var token=localStorage.getItem('token');
    var value=document.getElementById('value').value;
    var xhr=new XMLHttpRequest()
    xhr.open('get','http://43.140.247.80:8080/index/search/'+value); 
    xhr.setRequestHeader("Content-Type", "application/json");
    if(token!==null){
        xhr.setRequestHeader("Authorization",token);
    }
    xhr.send()
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            var res=JSON.parse(xhr.responseText)
            console.log(res.data);
            showResult(res,value);
        }
    }
}
function showResult(res,value){
    var hotpost=``
document.getElementsByClassName('content')[0].innerHTML=``;
    if(`${res.data.postsList.length}`!==0){
    for(let i=0;i<`${res.data.postsList.length}`;i++){
        if(`${res.data.postsList[i].likeStatus}`==0){
             hotpost+=`
        <div class="post2">
                <div class="post_title" >${res.data.postsList[i].head}
                    <span class="scanbox"><span class="scannumber"></span><span class="scan">${res.data.postsList[i].scanNumber}</span></span>
                    <span class="likenumber" id="${res.data.postsList[i].id}"> <span>${res.data.postsList[i].likeNumber}</span></span>
                </div>
                
                <div class="post_content2">
                ${res.data.postsList[i].body}
                </div>
            </div>`
        }
        else{
             hotpost+=`
        <div class="post2">
                <div class="post_title" >${res.data.postsList[i].head}
                    <span class="scanbox"><span class="scannumber"></span><span class="scan">${res.data.postsList[i].scanNumber}</span></span>
                    <span class="likenumber likenumberactive" id="${res.data.postsList[i].id}"> <span>${res.data.postsList[i].likeNumber}</span></span>
                </div>
                
                <div class="post_content2" onclick="turnPage(${res.data.postsList[i].id})">
                ${res.data.postsList[i].body}
                </div>
            </div>`
        }
    }
    }
    if(`${res.data.blockList.length}`!==0){
        for(let j=0;j<`${res.data.blockList.length}`;j++){
            hotpost+=`
       <div class="post2">
               <div class="post_title" >${res.data.blockList[j].blockName}
               <span class="postNum"> 共${res.data.blockList[j].postsNumber}贴</span>
                   <span class="scanbox"><span class="scannumber"></span><span class="scan">${res.data.blockList[j].scanNumber}</span></span>
                </div>
               
               <div class="post_content2" onclick="turnPlate(${res.data.blockList[j].id})">
               ${res.data.blockList[j].describe}
               </div>
           </div>`
        }
     }
     if(`${res.data.userList.length}`!==0){
        for(let j=0;j<`${res.data.userList.length}`;j++){
            hotpost+=`
            <div class="person_post2">
            <div class="col-md-1">
                <img src="${res.data.userList[j].idPhoto}" />
            </div>
            <div class="col-md-11">
                <div class="post_title">${res.data.userList[j].nickName}</div>
                <button class="cancel">封禁</button>
            </div>
            <div class="btn-group-vertical">
                <button type="button" class="btn btn-default dropdown-toggle cancel" data-toggle="dropdown-toggle">
                    管理<span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="#" onclick="managePlate(this)">下拉链接 1</a></li>
                    <li><a href="#" onclick="managePlate(this)">下拉链接 2</a></li>
                </ul>
            </div>
         </div>`
        }
     }
    document.getElementsByClassName('content')[0].innerHTML+=hotpost;
}
