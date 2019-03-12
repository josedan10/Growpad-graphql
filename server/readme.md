#Server offline documentation and helpers

##HTTP Responses
----
**1xx (Informational):** The request was received, continuing process
**2xx (Successful):** The request was successfully received, understood, and accepted
**3xx (Redirection):** Further action needs to be taken in order to complete the request
**4xx (Client Error):** The request contains bad syntax or cannot be fulfilled
**5xx (Server Error):** The server failed to fulfill an apparently valid request

1xx Informational response
An informational response indicates that the request was received and understood. It is issued on a provisional basis while request processing continues. It alerts the client to wait for a final response. The message consists only of the status line and optional header fields, and is terminated by an empty line. As the HTTP/1.0 standard did not define any 1xx status codes, servers must not[note 1] send a 1xx response to an HTTP/1.0 compliant client except under experimental conditions.[4]

100 Continue
The server has received the request headers and the client should proceed to send the request body (in the case of a request for which a body needs to be sent; for example, a POST request). Sending a large request body to a server after a request has been rejected for inappropriate headers would be inefficient. To have a server check the request's headers, a client must send Expect: 100-continue as a header in its initial request and receive a 100 Continue status code in response before sending the body. If the client receives an error code such as 403 (Forbidden) or 405 (Method Not Allowed) then it shouldn't send the request's body. The response 417 Expectation Failed indicates that the request should be repeated without the Expect header as it indicates that the server doesn't support expectations (this is the case, for example, of HTTP/1.0 servers).[5]
101 Switching Protocols
The requester has asked the server to switch protocols and the server has agreed to do so.[6]
102 Processing (WebDAV; RFC 2518)
A WebDAV request may contain many sub-requests involving file operations, requiring a long time to complete the request. This code indicates that the server has received and is processing the request, but no response is available yet.[7] This prevents the client from timing out and assuming the request was lost.
103 Early Hints (RFC 8297)
Used to return some response headers before final HTTP message.[8]
2xx Success
This class of status codes indicates the action requested by the client was received, understood and accepted.[2]

200 OK
Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, the response will contain an entity corresponding to the requested resource. In a POST request, the response will contain an entity describing or containing the result of the action.[9]
201 Created
The request has been fulfilled, resulting in the creation of a new resource.[10]
202 Accepted
The request has been accepted for processing, but the processing has not been completed. The request might or might not be eventually acted upon, and may be disallowed when processing occurs.[11]
203 Non-Authoritative Information (since HTTP/1.1)
The server is a transforming proxy (e.g. a Web accelerator) that received a 200 OK from its origin, but is returning a modified version of the origin's response.[12][13]
204 No Content
The server successfully processed the request and is not returning any content.[14]
205 Reset Content
The server successfully processed the request, but is not returning any content. Unlike a 204 response, this response requires that the requester reset the document view.[15]
206 Partial Content (RFC 7233)
The server is delivering only part of the resource (byte serving) due to a range header sent by the client. The range header is used by HTTP clients to enable resuming of interrupted downloads, or split a download into multiple simultaneous streams.[16]
207 Multi-Status (WebDAV; RFC 4918)
The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.[17]
208 Already Reported (WebDAV; RFC 5842)
The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again.
226 IM Used (RFC 3229)
The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.[18]
3xx Redirection
This class of status code indicates the client must take additional action to complete the request. Many of these status codes are used in URL redirection.[2]

A user agent may carry out the additional action with no user interaction only if the method used in the second request is GET or HEAD. A user agent may automatically redirect a request. A user agent should detect and intervene to prevent cyclical redirects.[19]

300 Multiple Choices
Indicates multiple options for the resource from which the client may choose (via agent-driven content negotiation). For example, this code could be used to present multiple video format options, to list files with different filename extensions, or to suggest word-sense disambiguation.[20]
301 Moved Permanently
This and all future requests should be directed to the given URI.[21]
302 Found (Previously "Moved temporarily")
Tells the client to look at (browse to) another URL. 302 has been superseded by 303 and 307. This is an example of industry practice contradicting the standard. The HTTP/1.0 specification (RFC 1945) required the client to perform a temporary redirect (the original describing phrase was "Moved Temporarily"),[22] but popular browsers implemented 302 with the functionality of a 303 See Other. Therefore, HTTP/1.1 added status codes 303 and 307 to distinguish between the two behaviours.[23] However, some Web applications and frameworks use the 302 status code as if it were the 303.[24]
303 See Other (since HTTP/1.1)
The response to the request can be found under another URI using the GET method. When received in response to a POST (or PUT/DELETE), the client should presume that the server has received the data and should issue a new GET request to the given URI.[25]
304 Not Modified (RFC 7232)
Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match. In such case, there is no need to retransmit the resource since the client still has a previously-downloaded copy.[26]
305 Use Proxy (since HTTP/1.1)
The requested resource is available only through a proxy, the address for which is provided in the response. Many HTTP clients (such as Mozilla Firefox[27] and Internet Explorer) do not correctly handle responses with this status code, primarily for security reasons.[28]
306 Switch Proxy
No longer used. Originally meant "Subsequent requests should use the specified proxy."[29]
307 Temporary Redirect (since HTTP/1.1)
In this case, the request should be repeated with another URI; however, future requests should still use the original URI. In contrast to how 302 was historically implemented, the request method is not allowed to be changed when reissuing the original request. For example, a POST request should be repeated using another POST request.[30]
308 Permanent Redirect (RFC 7538)
The request and all future requests should be repeated using another URI. 307 and 308 parallel the behaviors of 302 and 301, but do not allow the HTTP method to change. So, for example, submitting a form to a permanently redirected resource may continue smoothly.[31]
4xx Client errors
A 404 error on Wikipedia.
404 error on Wikipedia
This class of status code is intended for situations in which the error seems to have been caused by the client. Except when responding to a HEAD request, the server should include an entity containing an explanation of the error situation, and whether it is a temporary or permanent condition. These status codes are applicable to any request method. User agents should display any included entity to the user.[32]

400 Bad Request
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).[33]
401 Unauthorized (RFC 7235)
Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource. See Basic access authentication and Digest access authentication.[34] 401 semantically means "unauthenticated",[35] i.e. the user does not have the necessary credentials.
Note: Some sites incorrectly issue HTTP 401 when an IP address is banned from the website (usually the website domain) and that specific address is refused permission to access a website.
402 Payment Required
Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or micropayment scheme, as proposed for example by GNU Taler[36], but that has not yet happened, and this code is not usually used. Google Developers API uses this status if a particular developer has exceeded the daily limit on requests.[37] Sipgate uses this code if an account does not have sufficient funds to start a call.[38] Shopify uses this code when the store has not paid their fees and is temporarily disabled. [39]
403 Forbidden
The request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource, or may need an account of some sort.
404 Not Found
The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
405 Method Not Allowed
A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.
406 Not Acceptable
The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.[40] See Content negotiation.
407 Proxy Authentication Required (RFC 7235)
The client must first authenticate itself with the proxy.[41]
408 Request Timeout
The server timed out waiting for the request. According to HTTP specifications: "The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time."[42]
409 Conflict
Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates.
410 Gone
Indicates that the resource requested is no longer available and will not be available again. This should be used when a resource has been intentionally removed and the resource should be purged. Upon receiving a 410 status code, the client should not request the resource in the future. Clients such as search engines should remove the resource from their indices.[43] Most use cases do not require clients and search engines to purge the resource, and a "404 Not Found" may be used instead.
411 Length Required
The request did not specify the length of its content, which is required by the requested resource.[44]
412 Precondition Failed (RFC 7232)
The server does not meet one of the preconditions that the requester put on the request.[45]
413 Payload Too Large (RFC 7231)
The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".[46]
414 URI Too Long (RFC 7231)
The URI provided was too long for the server to process. Often the result of too much data being encoded as a query-string of a GET request, in which case it should be converted to a POST request.[47] Called "Request-URI Too Long" previously.[48]
415 Unsupported Media Type
The request entity has a media type which the server or resource does not support. For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.
416 Range Not Satisfiable (RFC 7233)
The client has asked for a portion of the file (byte serving), but the server cannot supply that portion. For example, if the client asked for a part of the file that lies beyond the end of the file.[49] Called "Requested Range Not Satisfiable" previously.[50]
417 Expectation Failed
The server cannot meet the requirements of the Expect request-header field.[51]
418 I'm a teapot (RFC 2324, RFC 7168)
This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol, and is not expected to be implemented by actual HTTP servers. The RFC specifies this code should be returned by teapots requested to brew coffee.[52] This HTTP status is used as an Easter egg in some websites, including Google.com.[53][54]
421 Misdirected Request (RFC 7540)
The request was directed at a server that is not able to produce a response[55] (for example because of connection reuse).[56]
422 Unprocessable Entity (WebDAV; RFC 4918)
The request was well-formed but was unable to be followed due to semantic errors.[17]
423 Locked (WebDAV; RFC 4918)
The resource that is being accessed is locked.[17]
424 Failed Dependency (WebDAV; RFC 4918)
The request failed because it depended on another request and that request failed (e.g., a PROPPATCH).[17]
426 Upgrade Required
The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.[57]
428 Precondition Required (RFC 6585)
The origin server requires the request to be conditional. Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.[58]
429 Too Many Requests (RFC 6585)
The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.[58]
431 Request Header Fields Too Large (RFC 6585)
The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.[58]
451 Unavailable For Legal Reasons (RFC 7725)
A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.[59] The code 451 was chosen as a reference to the novel Fahrenheit 451 (see the Acknowledgements in the RFC).
5xx Server errors
The server failed to fulfil a request.[60]

Response status codes beginning with the digit "5" indicate cases in which the server is aware that it has encountered an error or is otherwise incapable of performing the request. Except when responding to a HEAD request, the server should include an entity containing an explanation of the error situation, and indicate whether it is a temporary or permanent condition. Likewise, user agents should display any included entity to the user. These response codes are applicable to any request method.[61]

500 Internal Server Error
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.[62]
501 Not Implemented
The server either does not recognize the request method, or it lacks the ability to fulfil the request. Usually this implies future availability (e.g., a new feature of a web-service API).[63]
502 Bad Gateway
The server was acting as a gateway or proxy and received an invalid response from the upstream server.[64]
503 Service Unavailable
The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.[65]
504 Gateway Timeout
The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.[66]
505 HTTP Version Not Supported
The server does not support the HTTP protocol version used in the request.[67]
506 Variant Also Negotiates (RFC 2295)
Transparent content negotiation for the request results in a circular reference.[68]
507 Insufficient Storage (WebDAV; RFC 4918)
The server is unable to store the representation needed to complete the request.[17]
508 Loop Detected (WebDAV; RFC 5842)
The server detected an infinite loop while processing the request (sent instead of 208 Already Reported).
510 Not Extended (RFC 2774)
Further extensions to the request are required for the server to fulfil it.[69]
511 Network Authentication Required (RFC 6585)
The client needs to authenticate to gain network access. Intended for use by intercepting proxies used to control access to the network (e.g., "captive portals" used to require agreement to Terms of Service before granting full Internet access via a Wi-Fi hotspot).[58]
Unofficial codes
The following codes are not specified by any standard.

103 Checkpoint
Used in the resumable requests proposal to resume aborted PUT or POST requests.[70]
218 This is fine (Apache Web Server)
Used as a catch-all error condition for allowing response bodies to flow through Apache when ProxyErrorOverride is enabled. When ProxyErrorOverride is enabled in Apache, response bodies that contain a status code of 4xx or 5xx are automatically discarded by Apache in favor of a generic response or a custom response specified by the ErrorDocument directive.[71]
419 Page Expired (Laravel Framework)
Used by the Laravel Framework when a CSRF Token is missing or expired.
420 Method Failure (Spring Framework)
A deprecated response used by the Spring Framework when a method has failed.[72]
420 Enhance Your Calm (Twitter)
Returned by version 1 of the Twitter Search and Trends API when the client is being rate limited; versions 1.1 and later use the 429 Too Many Requests response code instead.[73]
450 Blocked by Windows Parental Controls (Microsoft)
The Microsoft extension code indicated when Windows Parental Controls are turned on and are blocking access to the requested webpage.[74]
498 Invalid Token (Esri)
Returned by ArcGIS for Server. Code 498 indicates an expired or otherwise invalid token.[75]
499 Token Required (Esri)
Returned by ArcGIS for Server. Code 499 indicates that a token is required but was not submitted.[75]
509 Bandwidth Limit Exceeded (Apache Web Server/cPanel)
The server has exceeded the bandwidth specified by the server administrator; this is often used by shared hosting providers to limit the bandwidth of customers.[76]
526 Invalid SSL Certificate
Used by Cloudflare and Cloud Foundry's gorouter to indicate failure to validate the SSL/TLS certificate that the origin server presented.
530 Site is frozen
Used by the Pantheon web platform to indicate a site that has been frozen due to inactivity.[77]
598 (Informal convention) Network read timeout error
Used by some HTTP proxies to signal a network read timeout behind the proxy to a client in front of the proxy.[78]
Internet Information Services
Microsoft's Internet Information Services web server expands the 4xx error space to signal errors with the client's request.

440 Login Time-out
The client's session has expired and must log in again.[79]
449 Retry With
The server cannot honour the request because the user has not provided the required information.[80]
451 Redirect
Used in Exchange ActiveSync when either a more efficient server is available or the server cannot access the users' mailbox.[81] The client is expected to re-run the HTTP AutoDiscover operation to find a more appropriate server.[82]
nginx
The nginx web server software expands the 4xx error space to signal issues with the client's request.[83][84]

444 No Response
Used internally[85] to instruct the server to return no information to the client and close the connection immediately.
494 Request header too large
Client sent too large request or too long header line.
495 SSL Certificate Error
An expansion of the 400 Bad Request response code, used when the client has provided an invalid client certificate.
496 SSL Certificate Required
An expansion of the 400 Bad Request response code, used when a client certificate is required but not provided.
497 HTTP Request Sent to HTTPS Port
An expansion of the 400 Bad Request response code, used when the client has made a HTTP request to a port listening for HTTPS requests.
499 Client Closed Request
Used when the client has closed the request before the server could send a response.
Cloudflare
Cloudflare's reverse proxy service expands the 5xx series of errors space to signal issues with the origin server.[86]

520 Unknown Error
The 520 error is used as a "catch-all response for when the origin server returns something unexpected", listing connection resets, large headers, and empty or invalid responses as common triggers.
521 Web Server Is Down
The origin server has refused the connection from Cloudflare.
522 Connection Timed Out
Cloudflare could not negotiate a TCP handshake with the origin server.
523 Origin Is Unreachable
Cloudflare could not reach the origin server; for example, if the DNS records for the origin server are incorrect.
524 A Timeout Occurred
Cloudflare was able to complete a TCP connection to the origin server, but did not receive a timely HTTP response.
525 SSL Handshake Failed
Cloudflare could not negotiate a SSL/TLS handshake with the origin server.
526 Invalid SSL Certificate
Cloudflare could not validate the SSL certificate on the origin web server.
527 Railgun Error
Error 527 indicates that the request timed out or failed after the WAN connection had been established.[87]
530 Origin DNS Error
Error 530 indicates that the requested host name could not be resolved on the Cloudflare network to an origin server.[88]

## Sessions and JWT

Cookies+Sessions VS JSON Web Tokens (Diferencias y aclaraciones)
En este artículo vamos a analizar las ventajas y desventajas de usar un sistema de autenticación basado en JWT (JSON Web Tokens) frente al esquema tradicional basado en el uso de cookies y sesiones.

A fin de facilitar la comprensión, voy a presentarte una serie de resúmenes, que he ido adaptando a partir de recursos interesantes que encontré por la Internet. Si deseas consultar las fuentes originales, puedes encontrar los enlaces al final del artículo.

Sin más, empecemos.

Introducción
Para comprender mejor este artículo, es necesario que conozcas previamente qué son las cookies y su relación con las server-side sessions.

Si tienes en claro la diferencia entre cookies y sesiones, y cómo operan en conjunto, entonces podemos continuar hacia la primera pregunta.

¿Cookies o Tokens? ¿Qué es mejor?
Pregunta
He estado usando cookies y sesiones para gestionar la autenticación de usuarios en mis aplicaciones web, y estoy contento por lo simple que resulta su uso.

Sin embargo, un desarrollador iOS me comentó que lo nuevo y más adecuado es usar JWT (JSON Web Tokens).

Me dijo que JWT es el camino a seguir para implementar una autenticación en las aplicaciones móviles nativas. Sin dar ejemplos, simplemente comentó que las aplicaciones Android y iOS tienen problemas con las cookies.

He buscado información, pero no he encontrado algo que demuestre que los JSON Web Tokens sean superiores a las Cookies. Es más, me resultan tan similares que no he podido encontrar una diferencia importante, ni por qué se recomienda su uso con las aplicaciones móviles nativas.

Por lo menos a mi parecer, sí es posible usar Cookies en el desarrollo iOS.

Entonces mi pregunta es, para una aplicación móvil, ¿qué ventajas presenta una API que hace uso de JWT en vez de Cookies para la autenticación de usuarios?

Respuesta
Nosotros, como desarrolladores de software, tenemos una tendencia por aplicar todo aquello nuevo que encontramos. Por dar un ejemplo: si de pronto nos encontramos con un martillo que no hemos visto antes (a pesar de ser sólo una variante de las muchas que conocemos), comenzamos a ver todo como un "clavo". Sentimos la necesidad de aplicar todo aquello nuevo que vamos aprendiendo (en la gran mayoría de ocasiones).

Ahora bien, retomando la pregunta original:

Es importante mencionar que, ni los JWT ni las Cookies constituyen en sí mismos un mecanismo de autenticación.

El primero sólo define un formato de token, y el segundo es un mecanismo de gestión de estado para las peticiones HTTP.

Sólo con esto determinamos que es incorrecto decir que uno es superior a otro.
Es correcto sin embargo que ambos son ampliamente utilizados en sistemas de autenticación.

Tradicionalmente las aplicaciones web han usado cookies (en conjunto con sesiones) para hacer un seguimiento de los usuarios que han iniciado sesión. De esta forma, no necesitan enviar sus credenciales en cada petición.

Generalmente, el contenido de una cookie está determinado por un identificador único (generado aleatoriamente). Este ID le permite al servidor encontrar los datos de sesión correspondientes para cada usuario.

Sin embargo, en el desarrollo de APIs es más común aceptar tokens (en formato JWT principalmente) para que el servidor decida si otorgar acceso o no a quien está realizado la petición.

Esto se debe a que:

Tradicionalmente, el principal tipo de cliente (para visitar aplicaciones web) ha sido el web browser (navegador web), que presenta un soporte completo para cookies.
Pero las APIs hoy en día son usadas también por clientes HTTP mucho más simples, que no soportan cookies de forma nativa.
La autenticación basada en cookies es conveniente para los navegadores, pero más allá de ellos, para otros tipos de clientes tiene más sentido un enfoque basado en tokens (ya que estos pueden ser transportados a través de parámetros, encabezados o como parte del cuerpo de las peticiones HTTP).

Es decir, si una API admite tokens entonces aumentará el rango de clientes que puede atender, por lo que resulta más conveniente si la API se debe usar más allá de los navegadores web.

Hoy en día es posible el uso de cookies en las aplicaciones móviles nativas, pero en resumen: los JWT tienen una ventaja sobre las cookies sólo por el hecho de que su uso es más común. Siguiendo este enfoque, podemos tener más recursos de aprendizaje, SDKs, información sobre las vulnerabilidades más conocidas, etcétera.

Autenticación basada en tokens VS autenticación basada en cookies y sesiones
A continuación vamos a repasar cómo funcionan las cookies (en conjunto con sesiones) y los tokens, para que luego nos resulte más fácil resaltar las diferencias.

Digramas, de un sistema de autenticación tradicional, y de un sistema basado en tokens

Autenticación basada en cookies
La autenticación basada en cookies ha sido el método predeterminado (y comprobado) para manejar la autenticación de usuarios durante mucho tiempo.

La autenticación basada en cookies presenta un estado (es stateful).

Al iniciar sesión, luego que un usuario envía sus credenciales (y estas se validan), el servidor registra datos (con el fin de recordar que el usuario se ha identificado correctamente). Estos datos que se registran en el backend, en correspondencia con el identificador de sesión, es lo que se conoce como estado.

En el lado del cliente una cookie es creada para almacenar el identificador de sesión, mientras que los datos se almacenan en el servidor (y son llamados variables de sesión).

El flujo que sigue este sistema de autenticación tradicional es el siguiente:

Un usuario ingresa sus credenciales (datos que le permiten iniciar sesión)
El servidor verifica que las credenciales sean correctas, y crea una sesión (esto puede corresponderse con la creación de un archivo, un registro nuevo en una base de datos, o alguna otra solución server-side)
Una cookie con el session ID es puesta en el navegador web del usuario
En las peticiones siguientes, el session ID es comparado con las sesiones creadas por el servidor
Una vez que el usuario se desconecta, la sesión es destruida en ambos lados (tanto en el cliente como en el servidor)
Autenticación basada en tokens
La autenticación basada en tokens ha ganado prevalencia en los últimos años debido al aumento de las Single Page Applications, web APIs y la Internet de las cosas (Internet of Things en inglés).

Cuando hablamos de autenticación con tokens, generalmente hablamos de autenticación con JSON Web Tokens (JWT).

Si bien existen diferentes implementaciones, los JWT se han convertido en el estándar de facto. Con ello en mente, en el resto del artículo, tokens y JWT se usarán indistintamente.

La autenticación basada en tokens carece de estado (es stateless).

El servidor ya no guarda información de qué usuarios están conectados o qué tokens se han emitido. Esto es así porque cada solicitud realizada al servidor va acompañada de un token, y el servidor verifica la autenticidad de la solicitud basándose únicamente en el token.

Como ya comentamos antes, JWT define un formato para los tokens. Pero JWT no nos ata a ningún mecanismo de persistencia de datos en el lado del cliente y tampoco a ninguna regla de cómo se debe transportar el token.

Los tokens se envían generalmente como un Authorization header, con el valor Bearer {JWT}; pero pueden enviarse también en el cuerpo de una petición POST o incluso como un query parameter.

Veamos cómo funciona:

Un usuario ingresa sus credenciales (datos que le permiten iniciar sesión)
El servidor verifica que las credenciales sean correctas, y devuelve un token firmado
El token es guardado en el lado del cliente, comúnmente en el local storage (pero puede guardarse también en el session storage o incluso como una cookie)
Las peticiones siguientes al servidor incluyen este token (a través de un Authorization header o alguno de los otros métodos antes mencionados)
El servidor decodifica el JWT y si el token es válido procesa la solicitud
Una vez que el usuario se desconecta, el token es destruido en el lado del cliente (no es necesaria la interacción con el servidor)
Ventajas de la autenticación basada en tokens
Luego de comprender cómo funcionan ambos enfoques, vamos a ver las ventajas que presenta la autenticación basada en tokens sobre el enfoque tradicional basado en cookies.

Sin estado, escalable y desacoplado
Probablemente la mayor ventaja de usar tokens y no cookies es el hecho de que ofrecen una autenticación sin estado (stateless).

Desde backend no se necesita tener un registro de los tokens. Cada token es autónomo: contienen en sí mismos toda la data necesaria para confirmar su validez (así como también información puntual del usuario que ha iniciado sesión).

De esta forma, el único trabajo del servidor es: firmar tokens ante un inicio de sesión exitoso, y verificar que los tokens entrantes sean válidos.

Cross Domain y CORS
Las cookies funcionan bien con un dominio (o subdominio) en específico, pero cuando se trata de administrar cookies en diferentes dominios, el manejo se torna complicado.

En contraste, un enfoque basado en tokens con CORS habilitado hace que sea trivial exponer las APIs a diferentes servicios y dominios.

Dado que se requiere y se verifica un token en cada una de las llamadas al backend, siempre que haya un token válido, las solicitudes se pueden procesar. Sobre esto, hay algunos detalles que debemos tener en cuenta, y los abordaremos en la sección de Preguntas comunes).

Guardar datos en los JWT
Con un enfoque basado en cookies, simplemente guardamos el identificador de sesión.

Los tokens por otro lado nos permiten guardar cualquier tipo de metadata, siempre que se trate de un JSON válido.

La especificación de JWT indica que podemos incluir diferentes tipos de datos (llamados claims), y que se pueden guardar como datos reservados, públicos y privados.

Dependiendo del contexto, podemos optar por usar una cantidad mínima de claims, y guardar sólo la identificación de usuario y el vencimiento del token, o bien podemos incluir claims adicionales, como el email del usuario, quién emitió el token, los alcances y/o permisos de los que dispone el usuario, etcétera.

Performance
Al utilizar una autenticación basada en cookies, desde backend se debe realizar una búsqueda de la sesión (correspondiente al identificador enviado por el cliente; ya sea en archivos, en una base de datos SQL tradicional o una alternativa NoSQL). En ese caso es muy probable que la ida y vuelta tome más tiempo si lo comparamos con la decodificación de un token. Además, como se pueden almacenar datos adicionales en los tokens (como el nivel de permisos), podemos disminuir la cantidad de búsquedas requeridas para obtener y procesar los datos solicitados.

Por ejemplo, supongamos que tenemos un recurso /api/orders en nuestra API que devuelve las últimas órdenes registradas en nuestra aplicación, pero sólo los usuarios con rol administrador tienen acceso para ver esta data.

En un enfoque basado en cookies, una vez que se realiza la petición, desde backend es necesario hacer una consulta para verificar que la sesión es válida, otra búsqueda para acceder a los datos del usuario y verificar que tenga el rol de administrador, y finalmente una tercera consulta para obtener los datos.

Por otro lado, usando JWT, podemos guardar el rol del usuario en el token. Así, una vez que la petición se realiza y el token se valida, necesitamos realizar una sola consulta a la base de datos (para acceder a la información de las órdenes).

Listo para móviles
Las APIs modernas no solo interactúan con el navegador.

Escribir correctamente una API implica que pueda ser usada tanto por navegadores como desde plataformas móviles nativas (como iOS y Android).

Las plataformas móviles nativas y las cookies no operan muy bien en conjunto, ya que se debe tener en cuenta toda una serie de consideraciones para su correcto funcionamiento.

Los tokens, por otro lado, son mucho más fáciles de implementar (tanto en iOS como en Android). También son más fáciles de implementar para aplicaciones y servicios de Internet of Things (que no incorporan el concepto de gestión de cookies).
Preguntas comunes e inquietudes
En esta sección, veremos algunas preguntas y preocupaciones comunes que surgen con frecuencia cuando se trata el tema de autenticación basada en tokens.

El tema principal es la seguridad, pero examinaremos también el tamaño que pueden tener los tokens, el almacenamiento y la encriptación.

Tamaño de los JWT

La mayor desventaja de la autenticación basada tokens es el tamaño de los JWT.

Una cookie de sesión es relativamente pequeña en comparación (incluso) con el token más pequeño.

Dependiendo del caso, el tamaño de un token puede resultar problemático si lo cargamos con muchos claims.

Recuerda que cada solicitud al servidor debe incluir el correspondiente JWT.

¿Dónde almacenar los tokens?

Con una autenticación basada en tokens, tenemos la opción de escoger dónde guardar los JWT.

Comúnmente, los JWT son almacenados en el local storage de los navegadores, y esto funciona bien para la mayoría de los casos.

Existen algunos inconvenientes a tener en cuenta si almacenamos los JWT en el local storage (los mencionamos luego).

Podemos almacenar un token en una cookie, pero el tamaño máximo de una cookie es de 4kb, por lo que puede ser problemático si el token presenta varios claims. También podemos almacenar un token en el session storage, que es similar al local storage, pero se borra en el instante en que el usuario cierra el navegador.

Protección XSS y XSRF

Proteger a nuestros usuarios y servidores es siempre una prioridad.

Las preocupaciones más comunes que tienen los desarrolladores para decidir si usar o no la autenticación basada en tokens son acerca de la seguridad.

Dos de los vectores de ataque más comunes que enfrentan los sitios web son:

Cross Site Scripting (XSS), y
Cross Site Request Forgery (XSRF o CSRF).
Los ataques de Cross Site Scripting ocurren cuando una entidad externa puede ejecutar código sobre un sitio web o aplicación.

El vector de ataque más común aquí es si un sitio web presenta entradas (inputs) que no están debidamente validadas.

Si un atacante puede ejecutar código Javascript sobre tu dominio, tus JSON Web Tokens son vulnerables.

Muchos frameworks, automáticamente validan (desinfectan) las entradas de datos y evitan la ejecución de código arbitrario.

Si no estás utilizando un framework (que realice esta validación), puedes usar también plugins (como caja, un plugin desarrollado por Google para ayudar con esta tarea).

Se recomienda usar un framework o plugin para tener este problema resuelto, versus la alternativa de crear una solución propia.

Los ataques de Cross Site Request Forgery no son un problema si estás utilizando JWT con el local storage. Por otro lado, si almacenas el JWT en una cookie, deberás protegerte contra XSRF.

Si este concepto no te resulta conocido, puedes ver este video que explica con mayor detalle cómo funcionan los ataques XSRF.

Afortunadamente, prevenir los ataques XSRF no es muy complicado. En resumen: para protegernos en contra de ataques XSRF, nuestro servidor, al establecer una sesión con un cliente debe generar un token único (es importante tener en claro que no es un JWT). Luego, cada vez que se envíen datos al servidor, un campo de entrada oculto (hidden input field) contendrá este token y el servidor lo validará para asegurarse de que los tokens coincidan.

Otra buena forma de proteger a nuestros usuarios y servidores consiste tener un tiempo de expiración corto para los tokens. De esta forma, incluso si un token se ve comprometido, rápidamente se volverá inútil. Además, podemos mantener una lista negra (blacklist) de tokens comprometidos y así evitar que estos tokens puedan usarse. Finalmente, un enfoque definitivo sería cambiar el algoritmo de firma, lo que invalidaría todos los tokens activos y requeriría que todos los usuarios inicien sesión de nuevo. Este enfoque no es recomendable, pero está disponible en caso de una infracción grave.

Los Tokens son firmados, mas no encriptados

Un JSON Web Token se compone de 3 partes: header, payload, y signature.

El formato de los JWT consiste en unir estas partes usando un punto entre ellas: header.payload.signature.

Por ejemplo, si tuviéramos que firmar un JWT con el algoritmo HMACSHA256, la clave secreta 'shhhh' y el siguiente contenido (payload):

{
  "sub": "1234567890",
  "name": "Ado Kukic",
  "admin": true
}
El JWT generado sería:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbyBLdWtpYyIsImFkbWluIjp0cnVlLCJpYXQiOjE0NjQyOTc4ODV9.Y47kJvnHzU9qeJIN48_bVna6O0EDFiMiQ9LpNVDFymM
Lo más importante a tener en cuenta aquí, es que este token está firmado usando el algoritmo HMACSHA256, pero el encabezado (header) y los datos (payload) están codificados en Base64URL (no están encriptados).

Si vamos a jwt.io, pegamos el token y seleccionamos el algoritmo HMACSHA256 (abreviado como HS256), podemos decodificar el token y leer su contenido. Por lo tanto, no hace falta decir que datos confidenciales, como contraseñas, nunca deben almacenarse en el payload.

Si necesitas almacenar datos confidenciales en el payload, puedes usar JSON Web Encryption (JWE). JWE permite cifrar el contenido de un JWT para que no sea legible por nadie más que por el servidor. Aunque es posible encriptar el contenido de un token, no es realmente necesario para un sistema de autenticación (lo que sí es importante es que usemos el protocolo HTTPS para que los mensajes que intercambiamos con el servidor viajen cifrados).

Autenticación: Uso de JWT vs sesiones
Los JWT proveen un mecanismo para mantener el estado de una sesión en el lado del cliente, en vez de hacerlo en el servidor.

Por lo tanto, una pregunta más adecuada sería, "¿Cuáles son los beneficios de usar JWT sobre usar sesiones del lado del servidor?" (server-side sessions).

Con las server-side sessions es necesario guardar las sesiones activas en una base de datos o en memoria; y por otro lado asegurar que cada cliente siempre sea atendido por el mismo servidor. Ambos presentan inconvenientes.

Si se usa una base de datos (u otro almacenamiento centralizado), esto puede convertirse en un cuello de botella (una preocupación más), ya que se requiere realizar una consulta al atender cada request (petición).

Con una solución en memoria limitamos nuestro escalamiento horizontal, y las sesiones son afectadas por problemas de red (como el reinicio de servidores).
Mover la sesión al lado del cliente significa que ya no necesitamos mantener una sesión del lado del servidor, pero nos encontramos con nuevos desafíos:

Guardar los tokens de forma segura
Transportarlos de forma segura
Los JWT (que representan a las sesiones) pueden ser difíciles de invalidar
Asegurar confiabilidad sobre los datos enviados por el cliente
Estos problemas los comparten todos los mecanismos de sesión del lado del cliente (como los JWT).

JWT de forma particular ya soluciona el último de los puntos mencionados.

¿Pero qué es un JSON Web Token?:

Es una cadena, un conjunto de caracteres, que contiene un poco de información. Para las sesiones de usuario puede incluir el username y el tiempo de expiración (fecha y hora). Pero en realidad puede representar lo que sea, incluso un identificador de sesión o el perfil completo del usuario que ha iniciado sesión. Aunque, por favor, esto debe evitarse.

Tiene una firma segura que evita que agentes externos malintencionados generen tokens falsos. Se necesita acceder a la clave privada del servidor para firmarlos; y gracias a esta firma se puede verificar que no se hayan modificado (desde que el servidor los firmó).

Se envían en cada petición (tal como sucede con las cookies). Comúnmente se envían a través del Authorization header de las peticiones HTTP, pero curiosamente también se pueden usar cookies para transportarlos.

Cada token es firmado, y así el servidor puede verificar su validez. El servidor confía en su habilidad para firmar los tokens de forma segura. Para esto existen bibliotecas estándares, que se recomiendan sobre las implementaciones que uno mismo pueda realizar.

A fin de transportar de manera segura el token, lo adecuado es enviarlo a través de un canal encriptado (generalmente httpS).

Con respecto al almacenamiento seguro del token en el cliente, debemos asegurar que los delincuentes no puedan acceder a ellos. Esto (principalmente) significa evitar que se cargue JS de sitios ajenos sobre nuestra página, porque con ello es posible leer el token y por tanto capturarlo. Esto se mitiga utilizando las mismas estrategias utilizadas para mitigar ataques XSS.

Si tienes la necesidad de invalidar los JWT, definitivamente hay formas de lograrlo.

Almacenar datos en una tabla temporal solo para usuarios que han solicitado que "se cierren sus otras sesiones" es una muy buena alternativa.

Si una aplicación necesita invalidar sesiones de forma específica, de la misma manera se puede guardar el ID de cada sesión y tener una tabla de "tokens desactivados". Esta tabla solo necesita conservar registros en base a la máxima duración permitida para los tokens.

Como habrás notado, la capacidad de invalidar tokens niega parcialmente el beneficio de las sesiones del lado del cliente, en el sentido de que se debe mantener un estado en el servidor (de las sesiones desactivadas). Pero, esta tabla ha de ser mucho más pequeña que la tabla de sesiones original (server-side sessions), por lo que las búsquedas todavía siguen siendo más eficientes.

Otra ventaja del uso de JWT es que resulta fácil de implementar utilizando las bibliotecas disponibles en (probablemente) todos los lenguajes que puedan existir. También está completamente divorciado de su esquema de autenticación: si se pasa a usar un sistema basado en huellas dactilares, no es necesario realizar ningún cambio en el esquema de administración de la sesión.

En resumen, JWT resuelve algunas de las deficiencias de otras técnicas de sesión:

Autenticación "más barata", porque puede eliminar un consulta a la base de datos (¡o al menos tener una tabla mucho más pequeña para consultar!), lo que a su vez habilita la escalabilidad horizontal.
Datos del lado del cliente "a prueba de manipulaciones".
Si bien los JWT no responden a otros problemas, como el almacenamiento seguro o el transporte, no suponen en realidad ningún nuevo problema de seguridad.

Existe mucha crítica negativa sobre los JWT, pero si se implementan con el mismo cuidado que otros tipos de autenticación, al final es lo mismo.

Una nota final: no es correcto comparar Cookies vs Tokens. Las cookies son un mecanismo para almacenar y transportar datos, y por tanto también se pueden usar para almacenar y transportar JSON Web Tokens.

### Should Cookies be used in RESTful APIs?

An ideal ReSTful service allows clients (which may not be in-browser) to perform any needed task in one request; because the full state needed to do that is held by the client, not the server. Since the client has full control of the state, it can create the state on its own (if that is legitimate), and only talk to the API to "get 'er done".

Requiring cookies can make that difficult. For clients besides browsers, managing cookies is a pretty big inconvenience compared to query params, plain request headers or the request body. On the other hand, In browser, using cookies can make lots of things much simpler.

So an API might first look in the Authorization header for the authentication data it needs, since that's probably the place where non-browser clients will prefer to put it, but to simplify and streamline browser-based clients, it might also check for a session cookie for server side log in, but only if the regular Authorization header was missing.

Another example might be a complex request that normally requires lots of parameters set. A non interactive client would have no trouble jamming all of that data into one request, but a HTML form based interface might prefer to break the request into several pages (something like a set of 'wizard' pages) so that users aren't presented with options that are not applicable based on previous selections. All of the intermediate pages could store the values in client side cookies, so that only the very last page, where the user actually submits the request, has any server side effect at all. The API could look for the needed attributes in the request body, and fall back to looking at cookies if the needed parameters weren't there.

Edit: in RE to @Konrad's comment below:

Tokens in comparison are harder to implement especially because you can't easily invalidate the token without storing them somewhere.

er... you are validating the cookies on the server side, right? Just because you told the browser to discard a cookie after 24 hours doesn't mean it will. That cookie could be saved by a highly technical user and reused long after it has "expired".

If you don't want to store session data on the server side, you should store it in the token (cookie or otherwise). A self contained auth token is sometimes called a Macaroon. How this is passed between client and server (whether by cookie, as extra headers, or in the request entity itself) is totally independent of the authentication mechanism itself.

###Authetication jwt usage vs sessions

JWT doesn't have a benefit over using "sessions" per say. JWTs provide a means of maintaining session state on the client in stead of doing it on the server.

What people often mean when asking this is "What are the benefits of using JWTs over using Server-side sessions"

With server-side sessions you will either have to store the session identifier in a database, or else keep it in memory and make sure that the client always hits the same server. Both of these have drawbacks. In the case of the database (or other centralised storage), this becomes a bottleneck and a thing to maintain - essentially an extra query to be done with every request.

With an in-memory solution you limit your horizontal scaling, and sessions will be affected by network issues (clients roaming between Wifi and mobile data, servers rebooting, etc)

Moving the session to the client means that you remove the dependency on a server-side session, but it imposes its own set of challenges.
- Storing the token securely
- transporting it securely
- JWTs Sessions can sometimes be hard to invalidate.
- Trusting the client's claim.

These issues are shared by JWTs and other client-side session mechanisms alike.

JWT in particular addresses the last of these. It may help to understand what a JWT is:

It is a bit of information. For user sessions you could include the username and the time when the token expires. But it could conceivably be anything, even the session ID or the user's entire profile. (Please don't do that though) It has got a secure signature that prevents malicious parties from generating fake tokens (You need access to the server's private key to sign them and you can verify that they were not modified after they were signed) You send them with every request, just like a cookie or Authorization Header would be sent. In fact they are commonly sent in the HTTP Authorization header but using a cookie is fine too.

The token is signed and so the server can verify its origin. We will assume that the server trusts its own ability to sign securely (you should use a standard library: don't try to do it yourself, and secure the server properly)

On the issue with securely transporting the token the answer is commonly to send it via an encrypted channel, usually httpS.

Regarding securely storing the token in the client, you need to ensure that the bad guys can't get to it. This (mostly) means preventing JS from bad web sites from reading the token to send it back to them. This is mitigated using the same strategies used to mitigate other kinds of XSS attacks.

If you have a need to invalidate JWTs there are definitely ways this can be achieved. Storing a per-user epoch for only users who have requested to have their "other sessions terminated" is a very efficient method that will probably be good enough. If a application needs per-session invalidation, then a session ID can be maintained in the same way and the "killed tokens" table can still be maintained to be much smaller than the full user table (You only need to retain records newer than the longest allowed token lifetime.) So the ability to invalidate the token partially negates the benefit of client-side sessions in that you would have to maintain this session killed state. This will more than likely be a much smaller table than the original session state table, so the lookups are still more efficient though.

One other benefit of using JWT tokens is that it is reasonably easy to implement using libraries available in probably every language you can expect to have it. It is also completely divorced from your initial user authentication scheme - if you move to a finger print based system you do not need to make any changes to the session management scheme.

A more subtle benefit: Because the JWT can carry "information" and this can be accessed by the client you can now start do some smart things. For example remind the user that their session will be expiring a few days before they are logged out, giving them the option to re-authenticate, based on the expiry date in the token. Whatever you can imagine.

So in short: JWTs answers some of the questions and shortcomings of other session techniques.
1. "Cheaper" authentication because you can eliminate a DB round trip (or at least have a much smaller table to query!), which in turns enable horizontal scalability.
2. Tamper-proof client-side claims.

While JWTs does not answer the other issues like secure storage or transport, it does not introduce any new security issues.

A lot of negativity exists around JWTs but if you implement the same security that you would for other types of authentication, you will be fine.

One final note: It is also not Cookies vs Tokens. Cookies is a mechanism for storing and transporting bits of information and can be used to store and transport JWT tokens too.