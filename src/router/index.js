import Vue from 'vue'
import Router from 'vue-router'
import article from '@/components/article.vue'
import articleEditor from '@/components/article-editor.vue'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'article',
		component: article
	},
	{
		path: "/editor",
		name: "article-editor",
		component: articleEditor
	}
	]
})
