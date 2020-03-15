编辑template得到ast
var ast = parse(template.trim(), options);



ast转成vnode
vnode渲染成真实DOM


function anonymous(
) {
with(this){return _c('div',{attrs:{"id":"app"}},[_c('input',{directives:[{name:"model",rawName:"v-model.string",value:(user),expression:"user",modifiers:{"string":true}}],staticClass:"aa",class:{title,content},style:({background}),attrs:{"type":"text"},domProps:{"value":(user)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_k($event.keyCode,"a",undefined,$event.key,undefined))return null;if(!$event.altKey)return null;return aaa($event)},"input":function($event){if($event.target.composing)return;user=$event.target.value}}}),_v(" "),_l((arr),function(v,index){return _c('p',{key:index},[_v(_s(v)+"=="+_s(index))])}),_v(" "),_l((arr),function(i,index){return _c('input',{key:index,attrs:{"type":"text"}})})],2)}
}

编译模板拿到 vnode
render:function anonymous(
       ) {
       with(this){return _c('div',{attrs:{"id":"app"}},[_c('input',{directives:[{name:"model",rawName:"v-model.string",value:(user),expression:"user",modifiers:{"string":true}}],staticClass:"aa",class:{title,content},style:({background}),attrs:{"type":"text"},domProps:{"value":(user)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_k($event.keyCode,"a",undefined,$event.key,undefined))return null;if(!$event.altKey)return null;return aaa($event)},"input":function($event){if($event.target.composing)return;user=$event.target.value}}}),_v(" "),_l((arr),function(v,index){return _c('p',{key:index},[_v(_s(v)+"=="+_s(index))])}),_v(" "),_l((arr),function(i,index){return _c('input',{key:index,attrs:{"type":"text"}})})],2)}
       }
staticRenderFns: []

页面更新
vm.$el = vm.__patch__(prevVnode, vnode);
页面更新过程先用vnode创建元素，后用oldVnode销毁元素
createElm(
    vnode,
    insertedVnodeQueue,
    // extremely rare edge case: do not insert if old element is in a
    // leaving transition. Only happens when combining transition +
    // keep-alive + HOCs. (#4590)
    oldElm._leaveCb ? null : parentElm,
    nodeOps.nextSibling(oldElm)
);
removeVnodes([oldVnode], 0, 0);


在解析parseHTML()中调用
vue结构化指令
else if (!element.processed) {
    // structural directives
    processFor(element);
    processIf(element);
    processOnce(element);
}
给AST中属性赋值 
if?: string;
ifProcessed?: boolean;
elseif?: string;
else?: true;
ifConditions?: ASTIfConditions;

for?: string;
forProcessed?: boolean;
key?: string;
alias?: string;
iterator1?: string;
iterator2?: string;


Template=>AST =>VNode=>真实DOM

```
baseCompile ( template, options  ) {
    //编译生成ast
    var ast = parse(template.trim(), options);
    if (options.optimize !== false) {
      optimize(ast, options);
    }
    //ast生成render方法
    var code = generate(ast, options);
    return {
      ast: ast,
      render: code.render,
      staticRenderFns: code.staticRenderFns
    }
}

```
源码位置 vue\src\compiler\codegen\index.js
代码生成得到 for if 

编译过程就是生成render方法
render:function anonymous() {
    with(this){return _c('div',{attrs:{"id":"app"}},[_c('input',{directives:[{name:"model",rawName:"v-model.string",value:(user),expression:"user",modifiers:{"string":true}}],staticClass:"aa",class:{title,content},style:({background}),attrs:{"type":"text"},domProps:{"value":(user)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_k($event.keyCode,"a",undefined,$event.key,undefined))return null;if(!$event.altKey)return null;return aaa($event)},"input":function($event){if($event.target.composing)return;user=$event.target.value}}}),_v(" "),_l((arr),function(v,index){return _c('p',{key:index},[_v(_s(v)+"=="+_s(index))])}),_v(" "),_l((arr),function(i,index){return _c('input',{key:index,attrs:{"type":"text"}})})],2)}
}

编译模板得到AST
var ast = parse(template.trim(), options);
AST生成render方法（目标代码）

var code = generate(ast, options);
return {
  ast: ast,
  render: code.render,
  staticRenderFns: code.staticRenderFns
}

执行render方法返回Vnode 
vm._c('div',{attrs:{"id":"app"}})

更新过程
第一次直接用Vnode渲染，后面都是打补丁
if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
} else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode);
}
vm.$el = vm.__patch__(prevVnode, vnode);


vue指令内部原理

v-if原理
<input type="text" v-if="show">
在render方法中对应
(show)?_c('input',{attrs:{"type":"text"}}):_e()
即为true就有对应的VNode，为false就是空VNode 

v-for原理 renderList（val,render)
<div v-for="i of arr">{{i}}</div>
在render方法中对应
(show)?_c('input',{attrs:{"type":"text"}}):_e()
即为true就有对应的VNode，为false就是空VNode 
_l((arr),function(i){return _c('div',[_v(_s(i))])})

插值表达式 {{arr.length+1}} 即传入函数的参数
_s(arr.length+1)

a
v-html原理
 <span v-html="'abc'"></span>
_c('span',{domProps:{"innerHTML":_s('abc')}})

v-text
 <span v-text="'abc'"></span>
_c('span',{domProps:{"textContent":_s('abc')}})

v-once原理
<span v-once>This will never change: {{message}}</span>
staticRenderFns： _c('span',[_v("This will never change: "+_s(message))])}"]

v-pre
<span v-pre>{{ this will not be compiled }}</span>
_c('span',{pre:true},[_v("{{ this will not be compiled }}

v-bind v-on原理
<div :title="message" :class="{aa:show}" @click="ok" :style="{width:'200px'}"></div>
_c('div',{class:{aa:show},style:({width:'200px'}),attrs:{"title":message},on:{"click":ok}})


insert(parentElm, vnode.elm, refElm);

保持上次的状态
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>


vue响应式
$attrs $listeners prons data computed inject

Vue.$emit Vue.$on Vue.$off 
//Vue.$once 先Vue.$on在在执行回调函数中Vue.$off
events = {
eventName:[cb]
}

vnode = render.call(vm._renderProxy, vm.$createElement);
vm._update(vm._render(), hydrating);
创建DOM树的过程是深度优先搜索算法


watcher维护了一个关系 试图依赖的变量改变时 更新试图
get时收集依赖的变量 set时更新试图
