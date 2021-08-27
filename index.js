var ProjectName = 'Neuroevolution_T-rex_neataptic_v1.0';

/**
 * 映射neataptic模块中的类
 */
var Neat    = neataptic.Neat;
var Methods = neataptic.methods;
var Config  = neataptic.Config;
var Architect = neataptic.architect;

/**
 * 设定小恐龙的数据输入和输出数目
 */
var inputNum = 12;
var outputNum = 2;

/**
 * 初始化基础神经网络
 */
var startNetwork = new Architect.Perceptron(inputNum, 10, outputNum);

/**
 * 初始化遗传进化神经网络
 */
var neat = new Neat(
    inputNum,
    outputNum,
    function (_network)
    {
        return _network.score;
    },
    {
        popsize: 50,
        mutation: [Methods.mutation.MOD_WEIGHT],
        // selection: Methods.selection.POWER,
        mutationRate: 0.5,
        mutationAmount: Math.round(50*0.5),
        // fitnessPopulation: true,
        network: startNetwork,
        elitism: Math.round(50*0.2)
    }
);

/**
 * 初始化小恐龙死亡列表
 */
var G_deaded = [];

/**
 * 初始化整体最高分
 */
var HighestScore = 0;

setTimeout(function ()
{
    /**
     * 创建对应数目的小恐龙游戏iframe
     */
    createIframe(neat.population.length);

    setTimeout(function ()
    {
        /**
         * 让游戏启动起来
         */
        eachIframe(function (_win){
            pressJump(_win);
        });

        setZeroTimeout(function (){
            eachIframe(function (_win, _index){

                /**
                 * 当小恐龙游戏结束时进行对神经网络进行打分
                 * 同时记录游戏最高分
                 */
                if(_win.Runner.instance_.crashed){
                    if(G_deaded.indexOf(_index) == -1){
                        neat.population[_index].score = Math.ceil(_win.Runner.instance_.distanceRan);
                        var tempHighestScore = Number(_win.Runner.instance_.distanceMeter.digits.join(""));
                        if(tempHighestScore > HighestScore){
                            HighestScore = tempHighestScore;
                        }
                        G_deaded.push(_index);
                    }
                    return;
                }

                /**
                 * 预设小恐龙下蹲中继器
                 */
                if(typeof _win.isDucked == typeof UDF){
                    _win.isDucked = 0;
                }

                /**
                 * 获取小恐龙游戏的第一个障碍物
                 */
                var obstaclesAttr = getObstaclesAttr(_win, 0, ["xPos", "yPos", "size", "typeConfig", "speedOffset"]);

                /**
                 * 构建输入给神经网络的数据
                 */
                var inputs = [
                    obstaclesAttr["xPos"],
                    obstaclesAttr["typeConfig"].width ? obstaclesAttr["typeConfig"].width : 0,
                    obstaclesAttr["size"],
                    _win.Runner.instance_.tRex.xPos,
                    _win.Runner.instance_.tRex.config.WIDTH,
                    obstaclesAttr["yPos"],
                    obstaclesAttr["typeConfig"].height ? obstaclesAttr["typeConfig"].height : 0,
                    _win.Runner.instance_.tRex.yPos,
                    _win.Runner.instance_.tRex.config.HEIGHT,
                    obstaclesAttr["speedOffset"],
                    _win.Runner.instance_.tRex.jumping ? 1 : 0,
                    _win.isDucked
                ];

                /**
                 * 获得神经网络输出的结果
                 */
                var res = neat.population[_index].activate(inputs);
                
                /**
                 * 结果[0]大于0.5时跳
                 */
                if(res[0] > 0.5){
                    pressJump(_win);
                }

                /**
                 * 结果[1]大于0.5时切换下端模式
                 */
                if(res[1] > 0.5){
                    if(_win.isDucked){
                        upDuck(_win);
                        _win.isDucked = 0;
                    }else{
                        downDuck(_win);
                        _win.isDucked = 1;
                    }
                }
            });

            var thisFun = arguments.callee;

            /**
             * 所有小恐龙游戏结束时(全死了)
             * 进行遗传和进化突变来诞生下一代
             */
            if(isAllEnd()){
                neat.evolve().then(function ()
                {
                    console.log("第" + neat.generation + "代  ----  最高分 " + HighestScore);
                    G_deaded = [];
                    eachIframe(function (_win, _index){
                         restart(_win);
                    });
                    HighestScore = 0;
                    setZeroTimeout(thisFun);
                });
            }else{
                setZeroTimeout(thisFun);
            }

        });

    }, 8000);
});