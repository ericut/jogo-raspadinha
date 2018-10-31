# Raspadinha Digital

## Arquitetura

**CSS Principal da Raspadinha:**
```HTML
<link  rel="stylesheet"  href="css/raspadinha.css">
```
**jQuery + JS da Raspadinha**
```HTML
<script  src='js/jquery-2.1.3.js'></script>
<script  src="js/raspadinha.js"></script>
```
**Arquivo `raspadinha.js`**
Definição da área raspada para mostrar a raspadinha completa - em porcentagem.
```JS
scratched  =  30;
```

## Front-End 

Seguir instruções no arquivo: `index.html`

Container principal Raspadinha:
```HTML
<main class="full-container">
```
Fundos padronizados:
```HTML
<div class="full-bg"></div>
<div class="full-bg-fade"></div>
```
Container da Raspadinha:
```HTML
<div class="container-fit">
```
Imagem editável para o cliente:
*Specs 320px x 120px (PNG Transparente)*
```HTML
<div class="topo-cliente">
```
Container técnica da Raspadinha + Canvas da Raspadinha-
```HTML
<div class="container"  id="scratch-container">
<canvas class="canvas"  id="scratch-canvas"  width="320"  height="260"></canvas>
```
Telas de Resultado da Raspadinha
*Conteúdo Ganhou e Perdeu* 
```HTML
<div class="resultado">
```
Ganhou:
```HTML
<div  class="ganhou">
	<div  class="parabens"> <!-- IMG de Parabéns -->
		<img  src="img/parabens.png">
	</div>
	<div  class="imagem"> <!-- IMG do Produto -->
		<img  src="img/premios/produto.jpg">
	</div>
	<div  class="premio"> <!-- Nome do Produto -->
		Nome do Prêmio
	</div>
</div>
```
Container da quantidade de Raspadinhas:
```HTML
<div class="quantidade">
```
Mensagem padrão:
*Loja de retirada + Prazo de retirada*
```HTML
<div class="info-padrao">
```
Interatividade:
*Botões de Encerrar Sessão e Próxima Raspadinha*
```HTML
<div class="interatividade">
```


