# Navegação

Este é um exemplo de código que demonstra a estrutura de navegação em um aplicativo React Native. Existem três arquivos principais envolvidos: `index.js`, `app.routes.js` e `auth.routes.js`. Vamos entender como a navegação é configurada em cada um deles.

## index.js

O arquivo `index.js` é o ponto de entrada do aplicativo. Ele importa o React e o useState do pacote "react" e os componentes `AuthRoutes` e `AppRoutes` dos respectivos arquivos. Em seguida, ele define um componente chamado `Routes` que retorna o componente `AppRoutes`. Por fim, o componente `Routes` é exportado como padrão.

## app.routes.js

O arquivo `app.routes.js` é responsável pela configuração das rotas do aplicativo. Ele importa o `createDrawerNavigator` do pacote "@react-navigation/drawer" e o componente `Home` do diretório "../screens/home". Em seguida, ele utiliza o `createDrawerNavigator` para criar um navegador de gaveta chamado `Navigator`. Dentro do `Navigator`, é definida uma única tela chamada "Home" que renderiza o componente `Home`. Por fim, o componente `AppRoutes` é exportado como padrão.

## auth.routes.js

O arquivo `auth.routes.js` é responsável pela configuração das rotas de autenticação do aplicativo. Ele importa os componentes `SignIn` e `SignUp` dos diretórios "../screens/authentication/SignIn" e "../screens/authentication/SignUp", respectivamente. Além disso, ele importa o `createNativeStackNavigator` do pacote "@react-navigation/native-stack". Em seguida, ele utiliza o `createNativeStackNavigator` para criar um navegador de pilha chamado `AuthStack`. Dentro do `AuthStack`, são definidas duas telas: "SignIn" e "SignUp", que renderizam os componentes `SignIn` e `SignUp`, respectivamente. O `screenOptions` é configurado para ocultar o cabeçalho das telas. Por fim, o componente `AuthRoutes` é exportado como padrão.

Esse é um exemplo básico de como a navegação pode ser configurada em um aplicativo React Native usando o React Navigation. O arquivo `index.js` define o componente principal `Routes`, que decide qual conjunto de rotas será renderizado. O arquivo `app.routes.js` define as rotas do aplicativo, enquanto o arquivo `auth.routes.js` define as rotas de autenticação.