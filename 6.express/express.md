# Express 文档阅读
## 请求request
### req.body
用于post请求，默认情况下，它是 undefined，并在您使用 body-parser 和 multer 等正文解析中间件时填充。为了获取http传输的json数据，**express.json()中间件是必需的**。
### req.query
从url获取参数，用于get请求。
### req.ip
你的ip。
### req.hostname
包含从Host HTTP标头派生的主机名
### req.cookies
包含此请求发送到所有cookie
***
## 响应respond
### res.send()
发送响应数据到客户端。
### res.json()
以JSON格式发送响应数据到客户端

# session-express
## 配置项
 cookie: {
  // Cookie Options
  // 默认为{ path: '/', httpOnly: true, secure: false, maxAge: null }
   /** maxAge: 设置给定过期时间的毫秒数（date）
  * expires: 设定一个utc过期时间，默认不设置，http>=1.1的时代请使用maxAge代替之（string）
  * path: cookie的路径（默认为/）（string）
  * domain: 设置域名，默认为当前域（String）
  * sameSite: 是否为同一站点的cookie（默认为false）（可以设置为['lax', 'none', 'none']或 true）
  * secure: 是否以https的形式发送cookie（false以http的形式。true以https的形式）true 是默认选项。 但是，它需要启用 https 的网站。 如果通过 HTTP 访问您的站点，则不会设置 cookie。 如果使用的是 secure: true，则需要在 express 中设置“trust proxy”。
  * httpOnly: 是否只以http(s)的形式发送cookie，对客户端js不可用（默认为true，也就是客户端不能以document.cookie查看cookie）
  * signed: 是否对cookie包含签名（默认为true）
  * overwrite: 是否可以覆盖先前的同名cookie（默认为true）*/
  },
  ## req.session
  express-session会在客户端发送请求时，创建一个独特的sessionID，用于区别不同的session。这个sessionID存储在客户端的cookie内，服务器如果设置了**name**属性可以看到name也被包含进了cookie内。max-Age过期后用户的cookie会自动删除掉，从而无法通过sessionID获取到存储的值(失效后获取到undefined)，也就会失去登录状态了(req.session.username = undefined)。在sessionID的有效时间内，都会通过这个ID来获取服务器存储的req.session.各种值(各种请求都带上了这个cookie)
  ## req.sessionID
  获取ID，一堆随机数
  ## req.session.destroy()
  让你的sessionID失效，下次请求会获取新ID，就像过期了一样。用于登出。