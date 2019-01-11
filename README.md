# mappy

**Requisitos para hacer las pruebas**

- Tener Python instalado.

- Tener un entorno virtual activado (opcional).

- Crear una base de datos postgreSQL con los siguientes datos:

```
  Nombre: mappy
  Usuario: postgres
  Contraseña: 1
  Host: localhost
  Puerto: 5432
```
También se puede usar cualquier otra base de datos postgreSQL editando el archivo en la ruta:

>mappy/settings.py
```
if 'test' in sys.argv:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'mappy',
            'USER': 'postgres',
            'PASSWORD': '1',
            'HOST': 'localhost',
            'PORT': 5432,
        }
    }
```

Hay que considerar que el usuario debe tener la autorización para crear base de datos.

**Pasos para hacer las pruebas**

Instalar los requisitos en la computadora o en el entorno virtual. Para ello en el directorio principal del proyecto:

```bash
  pip install -r requirements.txt
```

Luego es necesario agregar las tablas a la base de datos.

```bash
  python manage.py migrate
```

Finalmente para correr la prueba:

```bash
  python manage.py test
```

Una vez iniciadas las pruebas, se creará una base de datos temporal con la estructura de la base de datos establecida en configuraciones. Al finalizar, se hará un tearDown de todo el proceso dejando sin rastro alguno las operaciones realizadas.

**Consideraciones para la inspección del código**

El código de las pruebas están ubicados en el archivo ubicado en la ruta

>api/test.py

La inicicialización está representada por el método ```setUP(self)```

Las pruebas se identifican por los métodos que tienen el prefijo ```test_```

Las verificaciones se realizan con los asiertos otorgados por el framework ```assertEquals(a,b)```

La finalización no está explícita en las clases de prueba pues ```tearDown(self)``` es un método heredado de ```APITestCase``` el cual establece a todos los elementos de la clase y por ende a todos sus atributos en ``None```.
