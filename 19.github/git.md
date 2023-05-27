# Git功法
# 本地
## git commit
git仓库中的提交记录保存了我目录下所有文件的快照。  
git commit后，代码库被修改，并且把修改保存为了一个提交记录
## git branch \<name>
创建分支！
## git checkout \<name>
切换分支，我们的提交以后就会修改保存在新的分支上！  
git checkout -b \<name> 这个指令可以创建新分支，并且跳转到新分支上。
## git merge \<name>
合并分支，回到主线。把所处分支以外的某个分支合并在一起，一般是处于main分支，合并bugFix分支。

## git rebase \<name>
让所处分支移到目标分支的下一步，并在曾经所处位置留下副本。这让分支看起来就像是线性流程一样，没有分支。
## HEAD
你的所处的位置？感觉checkout定位就是操作HEAD
## 移动提交记录
**^** 向上移动一个提交记录.  
git checkout main^ "main的父节点"  
git checkout main^^ "main的第二个父节点"  
另外也可以使用git checkout HEAD^从当前位置向上移动  
**一直^hen很麻烦**，所以~3 向上移动3个提交记录；

## -f
省去HEAD指向才能变动，直接让目标移动提交记录  
**git branch -f main**强制移动  
git branch -f main HEAD~3  
上一句意思是:让main分支强制移动到HEAD上三个位置

## 撤销
### git reset
git reset HEAD **^**  
提交记录向上移一步，HEAD以下的提交记录全部抹除。  
本地使用git reset很方便，但是这种"改写历史"的方法对大家一起使用的远程分支是无效的。为了撤销更改并分享给别人，我们需要git revert。
### git revert
git revert HEAD  
撤销提交却多了一个新的提交记录，这条更改和reset自己用起来，和reset效果一样  
**两者还有个不同点，reset需要指明移动几个位置^；rever只需要指明自身，而不需要指出位置**
***
## git cherry-pick xx yy zz
将目标名字分支xx yy zz副本'移动到当前HEAD底部，添加完毕后，当前HEAD也要移动到分支也要移动到zz'
***
# 远程
远程仓库分支有着自己的命名规范  
远程仓库名/分支名，比如remote/main，大多数远程仓库名字为orgin。
直接在远程仓库commit会进入HEAD分离状态
## git clone
git clone url  
克隆仓库
## git fetch
git fetch url  
获取远程仓库的提交记录(C)，并更新远程分支指针(o/main)；**它可能已经将进行这一操作所需的所有数据都下载了下来，但是并没有修改你本地的文件。** 可以理解为单纯的下载操作。  
git fetch执行后会把远程所有的分支都下载下来，只差同步了。
## git pull
是一个集fetch和merge于一身的命令。首先本地fetch远程仓库，分支获取后，再git merge o/main把远程合并到main*本地。
## git push
推送到远程仓库，并且远程仓库与本地也会同步。但是push由于历史偏移，会强制让你先合并远程代码，然后才能分享你的工作。  
对于历史偏移，教程的步骤是：  
git fetch -> git rebase o/main ->git push  
**git pull --rebase** git push 这两个指令用于rebase式拉取并推送。这样会以远程仓库路线为基准，减少了远程仓库出现的分支。
## git branch -u o/main foo
这样foo就会追踪o/main了。如果当前就在foo分支上，还能省略foo。
比如以前在用main分支，现在改用foo分支了，这个命令的作用就是让foo分支拥有了同步远程main的能力。(远程的main会移动，本地的main和o/main也会移动)

