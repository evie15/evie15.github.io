window.onload=function(){
    var token=localStorage.getItem("token");
    var url=decodeURI(window.location.href);
    var url2=url.split("?id=");
    var url3=url2[1];
    var xhr=new XMLHttpRequest()
        xhr.open('get','http://43.140.247.80:8080/block/show/'+url3); 
        xhr.setRequestHeader("Content-Type", "application/json");
        if(token!=='undefined'){
            xhr.setRequestHeader("Authorization",token);
        }
        xhr.send();
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                addPlate(res.data);
          if(token!=='undefined'){
        var navi=`
        <ul>
        <li><a href="../loginhome/login.html"><button id="chosed">BBS</button></a>  </li>
        <li> </li>
        <li></li>
        <li></li>
        <li><a href="../inform/inform.html"><button> <span class="glyphicon glyphicon-bell"></span><span class="font">消 息</span> </button></a>  </li>
        <li><a href="../publish posts/pub_post.html"><button><span class="glyphicon glyphicon-edit"></span> <span class="font">创作中心</span>  </button></a>
        </li>
        <li>
        <a href="../personal/person.html" style="text-decoration: none;">
        <div class="user_ph"><img src="${res.data.idPhoto}" alt="">
                  <span class="login">${res.data.nickName}</span>
               </div>
        </a> 
               <span class="outlogin" onclick="out()">退出登陆</span>
        </li>
    </ul>`
    document.getElementsByClassName('navi')[0].innerHTML=navi;
    }
            }
        }
}
function addPlate(res){
    document.getElementsByClassName('title')[0].innerHTML=`<h3 class="text-center">
               ${res.block.blockName}
      </h3>`
      document.getElementsByClassName('dl-horizontal')[0].innerHTML=`
                            <dt>
                                贴数
                            </dt>
                            <dd>
                            ${res.block.postsNumber}
                            </dd>
                            <dt>
                                描述
                            </dt>
                            <dd>
                            ${res.block.blockDescribe}
                            </dd>
                            <dt>
                                版务
                            </dt>`
    var plateManager=``;
    for(let i=0;i<`${res.blockMasters.length}`;i++){
        plateManager+=` ${res.blockMasters[i].nickName} `
    }
    console.log(res);
    var son=document.createElement('dd');
    son.innerHTML=plateManager;
    document.getElementsByClassName('dl-horizontal')[0].innerHTML+=son.outerHTML;
    var i=0;
    var html2=``;
    for(i=0;i<`${res.block.topList.length}`;i++){
        html2+=`<tr onclick="turnPage(${res.block.topList[i].id})">
    <td>
    ${i+1} <span class="label label-danger">置顶</span> 
    </td>
    <td>
    ${res.block.topList[i].head}
    </td>
    <td>
    ${res.block.topList[i].date}
    </td>
    <td>
    ${res.block.topList[i].scanNumber} 
    </td>
    <th class="col-md-1">
    <span class="up"><span class="glyphicon glyphicon-fire" style="color: red;"></span></span> 
    </th>
</tr>`
    }
    for(let j=0;j<`${res.postsList.length}`;j++){
        html2+=`<tr>
    <td>
   ${j+i+1} 
    </td>
    <td onclick="turnPage(${res.postsList[j].id})">
    ${res.postsList[j].head}
    </td>
    <td>
    ${res.postsList[j].date}
    </td>
    <td>
    ${res.postsList[j].scanNumber} 
    </td>
    <th class="col-md-1">
    <span class="up" onclick="up(${res.postsList[j].id})">置顶  <span class="glyphicon glyphicon-eject"></span></span> 
    </th>
</tr>`
    }
    document.getElementsByClassName('tbody')[0].innerHTML=html2;

    var i=0;
    var html3=``;
    for(i=0;i<`${res.block.topList.length}`;i++){
        html3+=`<tr>
    <td>
    ${i+1}<span class="label label-danger">置顶</span>
    </td>
    <td  onclick="turnPage(${res.block.topList[i].id})">
    ${res.block.topList[i].head}
    </td>
    <td>
    ${res.block.topList[i].date}
    </td>
    <td>
    ${res.block.topList[i].scanNumber} 
    </td>
    <th class="col-md-1">
    <span class="up"  onclick="cancelup(${res.block.topList[i].id})">取消置顶  <span class="glyphicon glyphicon-eject"></span></span> 
    </th>
</tr>` 
    }
    document.getElementsByClassName('ahead')[0].innerHTML=html3;
}
function turnPage(num){
    console.log(num);
    url="../show posts/post.html?id="+num;
    window.location.href=url;
}
function up(id){
    var token=localStorage.getItem('token');
    var xhr=new XMLHttpRequest();
    xhr.open('get','http://43.140.247.80:8080/posts/top/'+id);
    xhr.setRequestHeader("Authorization",token);
    xhr.withCredentials=true;
    xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            window.location.reload();
            console.log(id)
        }
    }
    xhr.send();
}
function cancelup(id){
    var token=localStorage.getItem('token');
    var xhr=new XMLHttpRequest();
    xhr.open('get','http://43.140.247.80:8080/posts/top/cancel/'+id);
    xhr.setRequestHeader("Authorization",token);
    xhr.withCredentials=true;
    xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            window.location.reload();
            console.log(id)
        }
    }
    xhr.send();
}
