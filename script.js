const hambButton = document.querySelector(".hamb");
const menu = document.querySelector(".menu");
const body = document.querySelector("body");
const formLogin = document.querySelector(".form-login");
const formCadastro = document.querySelector(".form-cadastro");
const loginButton = document.querySelector(".login-button");
const loginLi = document.querySelector(".login-li");
const logoutButton = document.querySelector(".logout-button");
const logoutUl = document.querySelector(".logout-ul");
const carrinhoButton = document.querySelector(".carrinho-button");
const nomeProduto = document.querySelector(".c-nome-produto");
const precoProduto = document.querySelector(".c-preco-produto");
const descricaoProduto = document.querySelector(".c-desc-produto");
const totalProduto = document.querySelector(".c-total-produto");
const productCard = document.querySelector(".product-card");
const botaoContato = document.querySelector(".button-contato");
// Escuta o evento de redimensionamento da tela e fecha o menu caso a tela seja maior que 850px
window.addEventListener("resize", () => {
  if (window.innerWidth > 850) {
    menu.classList.remove("open");
    hambButton.classList.remove("open");
  }
});

botaoContato.addEventListener("click", () => {
  alert("Mensagem enviada com sucesso!");
});

// Escuta o evento de clique no botão de menu e abre o menu
hambButton.addEventListener("click", () => {
  hambButton.classList.toggle("open");
  menu.classList.toggle("open");
});

// Escuta o evento de clique no botão de logout para deslogar o usuario
logoutButton.addEventListener("click", () => {
  logoutUl.classList.toggle("active");
});

const path = window.location.pathname.split("/").pop();

// Verifica se o carrinho está vazio e adiciona a classe com-item caso não esteja
if (localStorage.getItem("carrinho") && localStorage.getItem("user")) {
  carrinhoButton.classList.add("com-item");

  if (path === "carrinho.html") {
    const carrinho = JSON.parse(localStorage.getItem("carrinho"));
    nomeProduto.innerHTML = carrinho.name;
    precoProduto.innerHTML = carrinho.price.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL"
    });
    descricaoProduto.innerHTML = carrinho.description;
    totalProduto.innerHTML = carrinho.price.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL"
    });
  }
} else {
  if (productCard) {
    productCard.style.display = "none";
  }
}

// Verifica se o usuario está logado e exibe o botão de logout
if (localStorage.getItem("user")) {
  const user = JSON.parse(localStorage.getItem("user"));
  logoutButton.style.display = "block";
  loginLi.style.display = "none";
  logoutButton.innerHTML = `Olá, ${user.name}`;
} else {
  logoutButton.style.display = "none";
  carrinhoButton.style.display = "none";
  logoutButton.parentNode.hidden = true;
  carrinhoButton.parentNode.hidden = true;
}

// Função para deslogar o usuario
function singOut() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "http://127.0.0.1:5501/"; // Redireciona para a home
}

// Verifica se o usuario está na pagina de login ou cadastro e exibe o botão de login
if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    const email = document.querySelector("#email");
    const emailValue = email.value;
    const password = document.querySelector("#password");
    const passwordValue = password.value;

    // Verifica se os campos estão vazios e exibe um alerta
    if (emailValue === "" || passwordValue === "") {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: emailValue, password: passwordValue })
      });

      const data = await response.json(); // Converte a resposta em JSON

      // Verifica se o status da resposta é 400 e exibe um alerta
      if (data.status === 400) {
        return alert(data.message);
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));

      window.location.href = "http://127.0.0.1:5501/"; // Redireciona para a home
      loginLi.style.display = "none";
    } catch (error) {
      console.log("aqui erro", error);
    }
  });
}

if (formCadastro) {
  formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.querySelector("#name");
    const nameValue = name.value;
    const email = document.querySelector("#email");
    const emailValue = email.value;
    const password = document.querySelector("#password");
    const passwordValue = password.value;
    if (emailValue === "" || passwordValue === "" || nameValue === "") {
      alert("Preencha todos os campos");
      return;
    }

    try {
      await fetch("http://localhost:3333/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
          name: nameValue
        })
      });
      alert("Cadastro realizado com sucesso");
      window.location.href = "http://127.0.0.1:5501/login.html";
    } catch (error) {
      console.log(error);
    }
  });
}

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho() {
  if (!localStorage.getItem("user")) {
    alert("Faça login para adicionar ao carrinho");
    return;
  }

  if (localStorage.getItem("carrinho")) {
    alert("Produto já adicionado ao carrinho");
    return;
  }

  carrinhoButton.classList.add("com-item");
  localStorage.setItem(
    "carrinho",
    JSON.stringify({
      name: "Produto 1",
      price: 100,
      description: "lorem ipsum dolor sit amet consectetur adipisicing elit. "
    })
  );
  alert("Produto adicionado ao carrinho");

  window.scrollTo(0, 0);
}

// Função para remover um produto do carrinho
function removerDoCarrinho() {
  localStorage.removeItem("carrinho");
  productCard.style.display = "none";
  carrinhoButton.classList.remove("com-item");
  totalProduto.innerHTML = "R$ 0,00";
}

// Função para finalizar a compra
function finalizarCompra() {
  if (!localStorage.getItem("carrinho")) {
    alert("Adicione um produto ao carrinho para finalizar a compra");
    return;
  }
  removerDoCarrinho();
  alert("Compra finalizada com sucesso!");
}
