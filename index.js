const cloneDeep = require('lodash.clonedeep');
const rules = require('./rules.json');

// 坑位
let positionNum = 2;

// 第一步，根据已有的式神过滤规则
// const myPets = ["樱花妖", "桃花妖", "酒吞童子", "山兔", "孟婆", "鬼使黑", "镰鼬", "铁鼠", "大天狗", "白狼", "萤草", "妖刀姬"];
const myPets = ["樱花妖", "桃花妖", "酒吞童子"];

const filtedRules = rules.filter(rule => rule.participants.every(participant => myPets.indexOf(participant) >= 0));

// 第二步，递归求解
const dp = (positionNum, rules) => {
    if(rules.length === 0){
        return 0;
    }
    const _mapper = (rule, index, arr) => {
        // 如果已经装不下了，就不能装了
        if (rule.participants.length > positionNum) {
            return 0;
        }
        // 否则，继续装
        const newRules = cloneDeep([...arr.slice(0, index), ...arr.slice(index + 1)]);
        // 同时，过滤掉新规则中的参与者
        newRules.forEach(r => {
            r.participants = r.participants.filter(participant => rule.participants.indexOf(participant) === -1)
        });
        return dp(positionNum - rule.participants.length, newRules) + rule.value;

    }

    return Math.max(...rules.map(_mapper))
}


console.log('--------------result:');
console.log(dp(positionNum, filtedRules));
