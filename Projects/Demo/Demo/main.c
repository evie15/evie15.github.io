#include<stdio.h>
#include<string.h>
char s[10]={'2','8','3',
       '1',' ','4',
       '7','6','5'};
   
char g[10]={'1','2','3',
        '8',' ','4',
       '7','6','5'};

char store[500][10];
int step,location,x,y;
int tNum=0;
int nextNum=0;
int dx[4]={0,1,0,-1};
int dy[4]={1,0,-1,0};

int comState()
{
 for(int i=0;i<tNum;i++)
 {
  if(strcmp(store[i],s)==0) return 0;
 }
 return 1;
}

int main()
{
 int mid_vaule;
 int tnum=1;
 int next_num=1;
 
 strcpy(store[tNum],s);
 tNum++;
 
 if(strcmp(s,g)==0)
 {
  printf("最短步数: %d\n",step);
  return 0;
 }
 
 while(1)
 {
  for(int j=tnum-next_num;j<tnum;j++)
  {
   strcpy(s,store[j]);
   for(int i=0;i<9;i++)
   {
    if(s[i]==' ')
    {
     location = i;
     break;
    }
   }
   
   x = location/3;
   y = location%3;
   
   for(int i=0;i<4;i++)
   {
    x+=dx[i];
    y+=dy[i];
    
    if(x<0 || x>=3 || y<0 || y>=3)
    {
     x-=dx[i];
     y-=dy[i];
     continue;
    }
   
    mid_vaule = s[x*3+y];
    s[x*3+y] = s[location];
    s[location] = mid_vaule;

    if(comState()==1)
    {
     strcat(store[tNum],s);
     printf("Now: %s \n",s);
     tNum++;
     nextNum++;
     if(tNum>=500)
     {
      printf("此问题无解\n");
      return 0;
     }
    }
    else
    {
     mid_vaule = s[x*3+y];
     s[x*3+y] = s[location];
     s[location] = mid_vaule;
    
     x-=dx[i];
     y-=dy[i];
     continue;
    }
 
    if(strcmp(s,g)==0)
    {
     step++;
     printf("最短步数: %d\r\n",step);
     return 0;
    }
    
    mid_vaule = s[x*3+y];
    s[x*3+y] = s[location];
    s[location] = mid_vaule;
    
    x-=dx[i];//坐标变换回去
    y-=dy[i];
   }
  }
  tnum=tNum;
  next_num = nextNum;
  nextNum = 0;
  step++;
 }
 return 0;
}

