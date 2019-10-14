### HTML头部标签管理：

Nuxt.js 通过 [vue-meta](https://github.com/declandewet/vue-meta) 实现头部标签管理，在 `nuxt.config.js` 中的 `head` 配置。所有的页面都会走这个配置，如果想要修改某一页面的title，可以在 pages/**.vue 文件下，添加如下配置，这时该页面的标题就变成了“收车费”，其余页面还保持原有标题不变。

```js
export default {
    head(){
        return {
            title:"文章详情"
        }
    }
}
```



### 动态路由

文章详情页模板，创建/pages/article/`_id.vue`文件，以"\_"为前缀的vue文件，就是动态路由，然后在里面用 `$route.params.id` 接收，**注意：此处的id就是 vue 文件"_"后面的名字**，代码如下：

`/pages/article/_id.vue：`



在父组件index.vue中，使用params传递id，注意：nuxt-link组件name名：<font color="red">article-id</font>，news代表文件夹的名字，id代表传递的参数；

```html
<div class="title">
	<nuxt-link :to="{name:'article-id',params:{id:article._id}}">
        {{article.title}}
    </nuxt-link>
</div>
```

###整合markdown







### 生成目录

