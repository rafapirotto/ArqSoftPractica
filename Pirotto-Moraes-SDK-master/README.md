# Manual de uso del SDK:

## Parámetros necesarios

### key

#### Descripción

<p>Este atributo es un jwt que se usa para la autorización que requiere el endpoint. El mismo se pasa por parámetro en el constructor.</p>

#### Ejemplo

```javascript
const key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJob2xhIiwib3JnYW5pemF0aW9uTmFtZSI6IkFwcGxlIiwiaWF0IjoxNjA2NzU5OTIwfQ.qGMpd8UiTcosaiUlccm_KYdFVeIixEQEmdGT8OP4gGQ";
```

<br>

### body

#### Descripción

<p>Este atributo contiene los datos del error que se quiere agregar. El mismo se pasa por parámetro en la llamada al método "addError()".</p>

#### Ejemplo

```javascript
const body = {
    title: "ERROR NUEVO",
    description: "ERROR NUEVO",
    severity: 1,
};
```

<br>

## Pasos para usar

1. Requerir el index
2. Inicializar el SDK con el atributo key
3. Llamar al metodo "addError()" pasándole el objeto body por parámetro

<br>

## Ejemplo de uso

```javascript
const AddErrorSDK = require("./index");
const errorSDK = new AddErrorSDK(process.env.key);

const body = {
    title: "ERROR NUEVO",
    description: "ERROR NUEVO",
    severity: 1,
};
errorSDK.addError(body);
```
