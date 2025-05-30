# Speaches

## Example `curl`s

```bash
curl -ivvv http://192.168.1.13:8002/v1/models/Systran%2Ffaster-distil-whisper-large-v3
```

Output:

```bash

```

* Transcribe with a medium model:

```bash
curl http://192.168.1.13:8002/v1/audio/transcriptions -F "file=@harvard.wav" -F "model=medium"

# Available models are:
# - tiny.en
# - tiny
# - base.en
# - base
# - small.en
# - small
# - medium.en
# - medium
# - large-v1
# - large-v2
# - large-v3
# - large
# - distil-large-v2
# - distil-medium.en
# - distil-small.en
# - distil-large-v3
# - large-v3-turbo
# - turbo
# 

```

Output in 17 minutes! : 

```bash
$ curl http://192.168.1.13:8002/v1/audio/transcriptions -F "file=@harvard.wav" -F "model=medium"
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 3174k    0   227  100 3174k      0   3093  0:17:30  0:17:30 --:--:--    65{"text":"The stale smell of old beer lingers. It takes heat to bring out the odor. A cold dip restores health and zest. A salt pickle tastes fine with ham. Tacos al pastor are my favorite. A zestful food is the hot cross bun."}

```

* Another test with small model took 5 to 6 miutes:

```bash
$ curl http://192.168.1.13:8002/v1/audio/transcriptions -F "file=@harvard.wav" -F "model=small"
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 3174k    0   227  100 3174k      0   9742  0:05:33  0:05:33 --:--:--    53{"text":"The stale smell of old beer lingers. It takes heat to bring out the odor. A cold dip restores health and zest. A salt pickle tastes fine with ham. Tacos al pastor are my favorite. A zestful food is the hot cross bun."}


```

* Another test, with streaming, small model and language set in adavance took only 9 seconds:

```bash
curl http://192.168.1.13:8002/v1/audio/transcriptions -F "file=@harvard.wav" -F "model=small" -F "stream=true" -F "language=en"

# Available models are:
# - tiny.en
# - tiny
# - base.en
# - base
# - small.en
# - small
# - medium.en
# - medium
# - large-v1
# - large-v2
# - large-v3
# - large
# - distil-large-v2
# - distil-medium.en
# - distil-small.en
# - distil-large-v3
# - large-v3-turbo
# - turbo
# 

```

Output:

```bash
$ curl http://192.168.1.13:8002/v1/audio/transcriptions -F "file=@harvard.wav" -F "model=small" -F "stream=true" -F "language=en"
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 3174k    0   325  100 3174k     33   329k  0:00:09  0:00:09 --:--:--    71data: {"text":"The stale smell of old beer lingers."}

data: {"text":"It takes heat to bring out the odor."}

data: {"text":"A cold dip restores health and zest."}

data: {"text":"A salt pickle tastes fine with ham."}

data: {"text":"Tacos al pastor are my favorite."}

data: {"text":"A zestful food is the hot cross bun."}


```


Doing streaming with axios:

```Js
const axios = require('axios');

axios({
  method: 'get',
  url: '/example.pdf',
  responseType: 'stream'
})
.then(response => {

  response.data.on('data', (chunk) => {
    // logic to process stream data
  });

  response.data.on('end', () => {
    // logic for stream complete
  });

}); 
```
## System Requirements

### If you run with GPU

for now,- amd gpu are not supported,- only nvidia,- because it is a limitaton of the CTranslate2 library used by  faster whisper:

https://github.com/SYSTRAN/faster-whisper/issues/162#issuecomment-1514767030

https://github.com/OpenNMT/CTranslate2/issues/1072
