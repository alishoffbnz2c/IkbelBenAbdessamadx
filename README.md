# Neuroevolution_T-rex

用神经网络来训练个能自己玩chrome断线时的那个小恐龙的AI

## 游戏本体（t-rex-runner）

游戏本体叫“t-rex-runner”，源码来自这里[https://github.com/wayou/t-rex-runner](https://github.com/wayou/t-rex-runner)。

下称“小恐龙游戏”。

## 我对游戏的修改

0. 删除了音乐（因为我电脑卡）
0. 移除了当焦点不在浏览器上就暂停游戏的监听（因为我要边写代码边看小恐龙）
0. 游戏的本体代码在 game.js 和 game.html （因为这样我可以通过iframe来控制多个同时运行的游戏）

## 关于人工智能或者神经网络或者机器学习

主要实现这些“智能”的类库来自于 Neuroevolution.js ，这个文件来自于[https://github.com/xviniette/FlappyLearning](https://github.com/xviniette/FlappyLearning)。

经过一段时间的分析，整理了这样思路，大概看懂了神经网络的学习原理，还有遗传算法

```
结构关系图
    - 种群
        - 世代 * n
            - 基因 * n
                - 得分
                - 神经网络
                    - 神经层 * n
                        - 神经元 * n

```

![](mind.png)

## 关于如何控制小恐龙游戏

看 index.js 你就会明白，我循环创建了几个iframe，一个iframe一个小恐龙游戏。
对每一个iframe进行操作，把小恐龙游戏的数据传递给AI，再把AI判断的结果换成操作并让小恐龙跳起来。

## 关于这个项目要怎么开始跑

0. 为了让iframe能避开安全沙箱（跨域什么的），从而实现index.js对iframe里面的上下文进行操作，因此你要开启web服务器，我用的是nodejs的一个叫“http-server”，因此你会看到我的目录下有个启动脚本“startServer.bat”吗，双击启动就行了（如果你是window的电脑的话），然后访问127.0.0.1:8080。
0. 页面运行的时候会创建50个iframe来跑小恐龙，由于我的电脑比较卡，因此setTimeout了10秒才启动小恐龙游戏，所以你看到50个小恐龙一动不动的时候不要慌张。当然你电脑强的话可以把50改成500。
0. 当所有小恐龙游戏结束的时候才会重新开始，所以死剩最后一个小恐龙的时候不要慌，而且重新开始之后AI并不会删除之前的训练数据（反正我不知道训练数据在哪里，你自己找找看），因此每次死完之后的重生，AI就更加聪明一筹。

## 关于如何保存和载入训练之后的AI

如何保存：当所有小恐龙游戏结束的时候，就会把神经网络结构保存进localStorage中，名为“Neuroevolution_T-rex”。

如何加载：页面刷新的时候（摁F5），就会把localStorage中getItem("Neuroevolution_T-rex")，如果有内容，就加载进当前的神经网络中。

下面是一段曾经跑出8000多高分的AI，想试试的话，在所有小恐龙游戏结束之前，就把下面的数组直接stringify后塞进localStorage中吧，然后刷新页面。

```
[{"neurons":[2,6,1],"weights":[-0.38157221655181095,-0.8646380882909694,-0.39149940856054855,0.4222055588452198,0.17284342034736033,-0.4763289944113649,-0.06022745781995198,-0.27998879254994913,-0.8461468063428925,0.013507623419859893,0.9676369294911478,-0.7940427371793257,-0.49410244522862445,-0.2516805429860396,-0.6432637717080438,-0.029620784808911615,0.9087966278340871,0.5284599501216545]},{"neurons":[2,6,1],"weights":[-0.40231669745494125,0.3170473825870279,0.21499115540322977,0.8535728570978716,0.7742584706574998,-0.22978963452982937,0.20036597771259412,-0.9259271999474037,-0.14266681267916592,0.6957442612478926,-0.9991653355813583,-0.5630738872217509,-0.402977480611582,0.7306423240623445,-0.847361449934041,-0.031812609281058446,0.5664753068047199,-0.9466395717266782]},{"neurons":[2,6,1],"weights":[0.1916788087632484,-1.1046669037098322,-0.8744607610359205,0.4222055588452198,-0.2524961987532377,-0.8788667736669631,-0.05724877685210372,-0.27998879254994913,-0.8461468063428925,-0.3326038445660586,-0.8698139275941132,0.41199819638146584,-0.017622327031783236,0.1224886416564388,0.63585118023162,-0.029620784808911615,0.9087966278340871,1.056461983342223]},{"neurons":[2,6,1],"weights":[0.1916788087632484,-0.8646380882909694,-0.8744607610359205,-1.068526474278336,-0.2524961987532377,-0.4763289944113649,-0.05724877685210372,0.2949353787368072,-0.8461468063428925,0.013507623419859893,-0.8698139275941132,0.5092013333862702,-0.017622327031783236,0.1224886416564388,0.63585118023162,-0.029620784808911615,-0.056102945092718404,0.7872968356964902]},{"neurons":[2,6,1],"weights":[0.1916788087632484,0.19316039348944636,-0.18927707386979709,-0.6870058110915984,-0.2524961987532377,0.35885749796988975,-0.05724877685210372,0.07491996800077816,-0.4815151750995408,-0.7145918631113619,-0.8698139275941132,0.719445481890221,-0.017622327031783236,-0.4736153303658348,0.63585118023162,-0.0495995159070719,-0.2718271509500385,0.7872968356964902]},{"neurons":[2,6,1],"weights":[0.1916788087632484,0.19316039348944636,-0.39149940856054855,-1.068526474278336,0.17284342034736033,-0.4763289944113649,-0.05724877685210372,0.07491996800077816,-0.24740600863381124,0.013507623419859893,1.0998972656342345,0.45911641804191095,-0.017622327031783236,-0.4736153303658348,-0.6432637717080438,-0.029620784808911615,-0.056102945092718404,0.5284599501216545]},{"neurons":[2,6,1],"weights":[0.1916788087632484,0.19316039348944636,-0.18927707386979709,-0.6870058110915984,-0.2524961987532377,0.35885749796988975,-0.05724877685210372,0.07491996800077816,-0.24740600863381124,-0.7145918631113619,-0.8698139275941132,0.719445481890221,-0.017622327031783236,-0.4736153303658348,0.6332818360360042,-0.0495995159070719,-0.056102945092718404,0.7872968356964902]},{"neurons":[2,6,1],"weights":[0.5164997559798385,-0.8646380882909694,-0.8744607610359205,0.4222055588452198,-0.2524961987532377,-0.4763289944113649,-0.05724877685210372,-0.27998879254994913,-0.8461468063428925,0.013507623419859893,-0.8698139275941132,0.5092013333862702,-0.017622327031783236,0.1224886416564388,0.63585118023162,-0.029620784808911615,-0.056102945092718404,0.5284599501216545]},{"neurons":[2,6,1],"weights":[0.1916788087632484,0.19316039348944636,-0.18927707386979709,-0.6870058110915984,-0.2524961987532377,0.35885749796988975,-0.05724877685210372,0.07491996800077816,-0.24740600863381124,-0.7145918631113619,-0.8698139275941132,0.719445481890221,-0.017622327031783236,-0.4736153303658348,0.6332818360360042,-0.0495995159070719,-0.056102945092718404,0.7872968356964902]},{"neurons":[2,6,1],"weights":[0.5971190665771329,0.19316039348944636,-0.18927707386979709,-0.6870058110915984,-0.2524961987532377,0.35885749796988975,-0.05724877685210372,0.07491996800077816,-0.24740600863381124,-0.7145918631113619,-0.8698139275941132,0.719445481890221,-0.017622327031783236,-0.4736153303658348,0.63585118023162,-0.0495995159070719,-0.056102945092718404,0.5720312048331175]},{"neurons":[2,6,1],"weights":[0.4170018416090331,-0.5647396676834444,-0.4798883776644507,0.6849114148582403,-0.9454164952647073,0.09376803027355374,0.30013653338909263,-0.22602006141486397,0.06169824228236509,-0.6262648046976564,0.9326071304873471,0.8608496561636678,-0.1667620123687077,0.45699482713048356,0.9124901912245744,0.830929827211131,-0.21323337100922357,0.06984327137272528]},{"neurons":[2,6,1],"weights":[-0.2889271179886488,0.7503923939912509,-0.6364732739101995,0.6874776998116907,-0.3137802628525548,0.551867671437178,0.18389997758957222,0.5069222309025747,0.17155648764986609,-0.39418259683595247,0.35359073734162827,0.6561976741833586,0.6642372728631369,0.7180568837588401,-0.46964723446401635,0.9538692031202909,0.880547101723661,-0.7220589667274311]},{"neurons":[2,6,1],"weights":[-0.360307671353862,0.5143705376486705,-0.9176720655990516,-0.9677850792054707,0.8323655334500764,0.8689013021404479,-0.10329492434812382,0.2567908525768452,0.0712234885780254,-0.31621946943303714,0.6680295213790268,-0.44607611594096097,0.8469515972267048,-0.24248010084479343,0.6736300894150702,-0.5187697923061747,-0.2264099143084608,0.0563306501049925]},{"neurons":[2,6,1],"weights":[-0.4449994805229789,0.44778656607040235,0.9339591267882117,-0.9046024486548832,0.25934253874484003,-0.811917425904277,0.6777758245012011,0.4178147210676779,-0.5996124550375543,-0.7289887004175748,0.4882402027822508,-0.6951488369060548,0.5790460988339916,-0.06469351971889248,-0.7668508419094229,-0.4763595049197171,0.8013970242923838,0.8919371287431956]},{"neurons":[2,6,1],"weights":[-0.24651125998711754,0.07803657949884846,-0.6043870365214707,-0.23821942982143796,0.15471371857144112,0.08653014148249749,0.261211197990046,-0.1715506709222585,-0.40878785949004115,0.04247512042570767,0.41870104691858634,0.45704210943634127,0.8446998813607527,-0.8537878682646376,0.5383175928171613,-0.1261227724467755,-0.31273467425828194,-0.34364476081580486]},{"neurons":[2,6,1],"weights":[0.24027674544401734,0.34699627628711527,-0.9459593503881836,-0.15734843289597888,-0.9212764859570499,-0.9724070160565184,-0.3158887316021004,0.19492942920947076,-0.0675146660019954,0.17555206041344062,-0.8067337934543377,0.2515659062931217,-0.3029192224219446,-0.35513938283943824,0.16914627239590008,-0.4294703378361464,0.65417596409532,0.9277626188861947]},{"neurons":[2,6,1],"weights":[0.16163312518034534,-0.03286103170709209,0.4039027826219215,-0.04741924752172899,-0.09149040909692996,-0.34766008819218186,0.012568207196752557,-0.4540586680966925,0.45698403171680324,-0.07693076323991432,-0.131715688477676,0.6477362827163011,0.5142188366287104,-0.6831117026556894,-0.279199874719426,-0.3979034827852188,0.500007550914769,0.9933150925378169]},{"neurons":[2,6,1],"weights":[0.840692598658868,-0.24435175599671455,0.49168353091446626,0.3250217941092073,0.1626600738049837,0.9548320972821105,-0.4889208692458218,-0.09350124205556654,-0.6306757889580696,0.5470063607686444,0.2363378776834666,-0.8853142759107455,0.5163156576155723,-0.3391521353486171,0.390174892206097,0.06735569702992006,0.8746335148632913,-0.9701913321983366]},{"neurons":[2,6,1],"weights":[0.8113406154021745,-0.6153099109145743,0.5812853593551601,-0.09726575572683904,0.9313938136853248,0.2924517633362407,-0.7570769065138925,-0.3313434405639373,0.8624404291869632,-0.055111619692433056,-0.9718033154494976,0.21440862208835254,-0.16640545582436594,-0.35389792802635167,-0.2840167431102665,-0.153962044533972,-0.0943922033176059,0.9557626156586663]},{"neurons":[2,6,1],"weights":[-0.65782036701559,-0.0015191228837982962,0.21620958312987693,0.6683235721281648,-0.7820194116766115,0.48836504015341786,-0.70660834637467,-0.26477913439987644,0.4243451292688465,-0.929210260543341,-0.7996329644096369,-0.8371469997783971,-0.42186646145399065,-0.19531051413485256,-0.8967993080136338,-0.12993032542076177,-0.6913120239475941,-0.8976930740059963]},{"neurons":[2,6,1],"weights":[-0.38157221655181095,0.3170473825870279,-0.39149940856054855,0.8535728570978716,0.7742584706574998,-0.4763289944113649,0.20036597771259412,-0.27998879254994913,-0.8461468063428925,0.013507623419859893,-0.9991653355813583,-0.5630738872217509,-0.402977480611582,0.7306423240623445,-0.847361449934041,-0.029620784808911615,0.5664753068047199,-0.9466395717266782]},{"neurons":[2,6,1],"weights":[-0.38157221655181095,-0.8646380882909694,0.21499115540322977,0.4222055588452198,0.17284342034736033,-0.4763289944113649,0.20036597771259412,-0.9259271999474037,-0.8461468063428925,0.013507623419859893,-0.9991653355813583,-0.7940427371793257,-0.402977480611582,-0.2516805429860396,-0.6432637717080438,-0.031812609281058446,0.9087966278340871,-0.9466395717266782]},{"neurons":[2,6,1],"weights":[-0.40231669745494125,-0.8646380882909694,-0.39149940856054855,0.4222055588452198,0.7742584706574998,-0.4763289944113649,-0.06022745781995198,-0.9259271999474037,-0.8461468063428925,0.013507623419859893,0.4897504691653556,-0.7940427371793257,-0.402977480611582,-0.2516805429860396,-0.6432637717080438,-0.29074682695034015,0.5664753068047199,0.5284599501216545]},{"neurons":[2,6,1],"weights":[-0.40231669745494125,-0.8646380882909694,-0.39149940856054855,0.4222055588452198,0.17284342034736033,-0.5307451094951534,0.20036597771259412,-0.27998879254994913,-0.8461468063428925,0.013507623419859893,-0.9991653355813583,-0.7940427371793257,-0.402977480611582,0.7306423240623445,-0.797093327867884,-0.031812609281058446,0.5664753068047199,-0.9466395717266782]},{"neurons":[2,6,1],"weights":[-0.38157221655181095,-0.8646380882909694,-0.23534581311414948,0.8535728570978716,0.7742584706574998,-0.22978963452982937,0.20036597771259412,-0.9259271999474037,-0.8461468063428925,0.35023839858795025,-0.9991653355813583,-0.7940427371793257,-0.49410244522862445,0.7306423240623445,-0.6289281243377516,-0.031812609281058446,0.9087966278340871,-0.9466395717266782]},{"neurons":[2,6,1],"weights":[-0.38157221655181095,0.3170473825870279,-0.39149940856054855,0.8535728570978716,0.7742584706574998,-0.4763289944113649,0.20036597771259412,-0.7011851838137553,-0.8683846054501829,0.6957442612478926,-1.014281194997031,-0.7940427371793257,-0.402977480611582,0.7306423240623445,-0.847361449934041,-0.029620784808911615,0.5664753068047199,-0.9466395717266782]},{"neurons":[2,6,1],"weights":[-0.40231669745494125,-0.8646380882909694,-0.014213695313725738,0.4222055588452198,0.17284342034736033,-0.4763289944113649,-0.06022745781995198,-0.9259271999474037,-0.14266681267916592,-0.22612869673674663,0.9676369294911478,-0.5630738872217509,-0.5685547833794462,0.7306423240623445,-0.847361449934041,-0.031812609281058446,0.9087966278340871,-0.9466395717266782]},{"neurons":[2,6,1],"weights":[-0.7371231157387914,-0.8646380882909694,-0.39149940856054855,0.4222055588452198,0.44267624344012013,-0.4763289944113649,-0.06022745781995198,-0.9259271999474037,-0.8461468063428925,0.013507623419859893,0.9477593433548408,-0.7940427371793257,-0.49410244522862445,-0.2516805429860396,-0.847361449934041,-0.029620784808911615,0.9087966278340871,0.5284599501216545]},{"neurons":[2,6,1],"weights":[-0.38157221655181095,-0.8646380882909694,-0.39149940856054855,0.4222055588452198,0.17284342034736033,-0.4763289944113649,-0.06022745781995198,-0.27998879254994913,-0.8461468063428925,0.6957442612478926,-0.9991653355813583,-0.7940427371793257,-0.402977480611582,-0.07339182686530221,-0.847361449934041,-0.031812609281058446,0.9087966278340871,-0.9466395717266782]},{"neurons":[2,6,1],"weights":[-0.40231669745494125,-0.8646380882909694,0.21499115540322977,0.8535728570978716,0.7742584706574998,-0.22978963452982937,0.20036597771259412,-0.9259271999474037,-0.8461468063428925,0.013507623419859893,-0.9991653355813583,-0.5630738872217509,-0.49410244522862445,0.7306423240623445,-0.847361449934041,-0.031812609281058446,0.5664753068047199,-0.9466395717266782]},{"neurons":[2,6,1],"weights":[-0.40231669745494125,0.3170473825870279,0.21499115540322977,0.8535728570978716,0.17284342034736033,-0.4763289944113649,0.23929329969518132,-0.9259271999474037,-0.8461468063428925,-0.21167230678623428,1.264776573569918,-0.5630738872217509,-0.402977480611582,0.7306423240623445,-0.6432637717080438,-0.031812609281058446,0.9087966278340871,-0.9466395717266782]},{"neurons":[2,6,1],"weights":[-0.38157221655181095,0.3170473825870279,-0.39149940856054855,0.8535728570978716,0.17284342034736033,-0.5515009298871492,-0.06022745781995198,-0.9259271999474037,-0.14266681267916592,0.013507623419859893,0.9676369294911478,-0.5630738872217509,-0.49410244522862445,-0.2516805429860396,-0.6432637717080438,-0.031812609281058446,0.5664753068047199,0.46202278377984896]},{"neurons":[2,6,1],"weights":[-0.38157221655181095,-0.8646380882909694,0.21499115540322977,0.4232419376506287,0.7742584706574998,-0.4763289944113649,-0.5221737358912393,-0.9259271999474037,-0.8461468063428925,0.013507623419859893,-0.959503453611966,-0.7940427371793257,-0.49410244522862445,0.7306423240623445,-0.847361449934041,-0.031812609281058446,0.9087966278340871,-0.9466395717266782]},{"neurons":[2,6,1],"weights":[-0.40231669745494125,0.3170473825870279,-0.39149940856054855,0.8535728570978716,0.17284342034736033,-0.4763289944113649,0.20036597771259412,-0.9259271999474037,-0.8461468063428925,0.8210270078431987,0.9676369294911478,-0.7940427371793257,-0.21610805732129856,0.7306423240623445,-0.6432637717080438,-0.029620784808911615,0.9087966278340871,0.5284599501216545]},{"neurons":[2,6,1],"weights":[-0.40231669745494125,-0.8646380882909694,-0.39149940856054855,0.8535728570978716,0.17284342034736033,-0.22978963452982937,-0.06022745781995198,-0.9259271999474037,-0.14266681267916592,0.013507623419859893,-0.9991653355813583,-0.7940427371793257,-0.49410244522862445,-0.2516805429860396,-0.6432637717080438,-0.031812609281058446,0.9893649241329301,0.5284599501216545]},{"neurons":[2,6,1],"weights":[-0.8802383214149481,-1.0349917700011988,0.21499115540322977,0.4222055588452198,0.7742584706574998,-0.4763289944113649,-0.06022745781995198,-0.27998879254994913,-0.8461468063428925,0.31903434051167157,0.9676369294911478,-0.5630738872217509,-0.49410244522862445,-0.2516805429860396,-0.847361449934041,-0.029620784808911615,0.9087966278340871,0.5284599501216545]},{"neurons":[2,6,1],"weights":[-0.8658218916394913,-0.8646380882909694,-0.39149940856054855,0.8535728570978716,0.17284342034736033,-0.4763289944113649,0.20036597771259412,-0.9259271999474037,-0.14266681267916592,0.6957442612478926,0.9676369294911478,-0.7940427371793257,-0.49410244522862445,0.7306423240623445,-0.6432637717080438,-0.029620784808911615,0.5664753068047199,0.5284599501216545]},{"neurons":[2,6,1],"weights":[-0.38157221655181095,0.3170473825870279,0.21499115540322977,0.8535728570978716,0.17284342034736033,-0.4763289944113649,0.20036597771259412,-0.9259271999474037,-0.14266681267916592,0.6957442612478926,-0.9991653355813583,-0.7940427371793257,-0.402977480611582,-0.2516805429860396,-0.6432637717080438,-0.031812609281058446,0.9087966278340871,0.5284599501216545]},{"neurons":[2,6,1],"weights":[0.0016308214505960095,0.3170473825870279,0.21499115540322977,0.4222055588452198,0.17284342034736033,-0.22978963452982937,0.20036597771259412,-0.27998879254994913,-0.14266681267916592,0.013507623419859893,-0.9991653355813583,-0.7940427371793257,-0.49410244522862445,0.6842591287566187,-0.847361449934041,-0.010828249555029146,0.5664753068047199,0.5497839022028621]},{"neurons":[2,6,1],"weights":[-0.38157221655181095,-0.7694885901061674,0.21499115540322977,0.4222055588452198,0.17284342034736033,-0.22978963452982937,-0.06022745781995198,-0.9259271999474037,-0.8461468063428925,0.6957442612478926,-0.9991653355813583,-0.7940427371793257,0.03469853580534932,0.7306423240623445,-0.6432637717080438,-0.031812609281058446,0.9087966278340871,0.5284599501216545]},{"neurons":[2,6,1],"weights":[-0.38157221655181095,0.34278346809336036,-0.39149940856054855,0.4222055588452198,0.7742584706574998,-0.4763289944113649,-0.06022745781995198,-0.9259271999474037,-0.14266681267916592,0.6957442612478926,0.9676369294911478,-0.5630738872217509,-0.402977480611582,-0.2516805429860396,-0.7033271362201421,-0.031812609281058446,0.5664753068047199,-0.9466395717266782]},{"neurons":[2,6,1],"weights":[-0.40231669745494125,0.3170473825870279,-0.39149940856054855,0.4222055588452198,0.7742584706574998,-0.22978963452982937,0.20036597771259412,-0.27998879254994913,-0.14266681267916592,0.6957442612478926,0.9676369294911478,-0.5630738872217509,-0.402977480611582,-0.2516805429860396,-0.6432637717080438,-0.029620784808911615,0.5497489350418261,-0.9466395717266782]},{"neurons":[2,6,1],"weights":[-0.40231669745494125,-0.8646380882909694,0.21499115540322977,-0.045726899552561706,0.7742584706574998,-0.4763289944113649,0.20036597771259412,-0.9259271999474037,-0.8461468063428925,0.02367701593847782,-0.9991653355813583,-0.5630738872217509,-0.402977480611582,-0.2516805429860396,-0.6432637717080438,-0.031812609281058446,0.9087966278340871,-0.9466395717266782]},{"neurons":[2,6,1],"weights":[-0.011103024467019385,0.3170473825870279,-0.39149940856054855,0.4222055588452198,0.7742584706574998,-0.22978963452982937,-0.06022745781995198,-0.27998879254994913,-0.14266681267916592,-0.26248292398127093,0.9676369294911478,-0.5630738872217509,-0.4904143989778482,-0.2516805429860396,-0.6432637717080438,-0.031812609281058446,0.9087966278340871,0.9425209628284659]},{"neurons":[2,6,1],"weights":[-0.40231669745494125,0.3170473825870279,-0.39149940856054855,0.4222055588452198,0.7742584706574998,-0.4763289944113649,0.20036597771259412,-0.27998879254994913,-0.14266681267916592,0.013507623419859893,0.9676369294911478,-0.7940427371793257,-0.402977480611582,0.7306423240623445,-0.847361449934041,-0.031812609281058446,0.5664753068047199,0.5284599501216545]},{"neurons":[2,6,1],"weights":[-0.40231669745494125,-0.8456812665104152,-0.39149940856054855,0.8535728570978716,0.17284342034736033,-0.4763289944113649,0.20036597771259412,-0.27998879254994913,-0.8461468063428925,0.6957442612478926,-0.9991653355813583,-0.7940427371793257,-0.49410244522862445,0.4045218223009355,-0.6432637717080438,-0.029620784808911615,0.6672825906965676,-0.9466395717266782]},{"neurons":[2,6,1],"weights":[-0.38157221655181095,0.4180530852945905,-0.39149940856054855,0.8535728570978716,0.17284342034736033,-0.4763289944113649,-0.06022745781995198,-0.9259271999474037,-0.8461468063428925,0.6957442612478926,0.9676369294911478,-0.5630738872217509,-0.402977480611582,0.7306423240623445,-0.6432637717080438,-0.029620784808911615,0.9087966278340871,-1.2729150908551166]},{"neurons":[2,6,1],"weights":[-0.40231669745494125,0.3170473825870279,0.21499115540322977,0.8535728570978716,0.7742584706574998,-0.4763289944113649,-0.06022745781995198,-0.27998879254994913,-0.14266681267916592,0.6957442612478926,0.9676369294911478,-0.5630738872217509,-0.402977480611582,-0.2516805429860396,-0.847361449934041,-0.031812609281058446,0.9087966278340871,-0.9466395717266782]},{"neurons":[2,6,1],"weights":[-0.38157221655181095,-0.8646380882909694,0.21499115540322977,0.4222055588452198,0.7742584706574998,-0.4763289944113649,0.20036597771259412,-0.27998879254994913,-0.14266681267916592,0.013507623419859893,-0.9991653355813583,-0.5630738872217509,-0.49410244522862445,-0.2516805429860396,-0.847361449934041,0.12387922003101104,0.9087966278340871,0.5284599501216545]},{"neurons":[2,6,1],"weights":[-0.40231669745494125,0.3170473825870279,-0.39149940856054855,0.8535728570978716,0.17284342034736033,-0.4763289944113649,-0.06022745781995198,-0.9259271999474037,-0.8461468063428925,0.013507623419859893,0.9676369294911478,-0.5630738872217509,-0.49410244522862445,-0.2516805429860396,-0.6432637717080438,-0.031812609281058446,0.92697248350209,-0.9466395717266782]}]
```