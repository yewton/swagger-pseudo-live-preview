swagger-pseudo-live-preview
===========================

You can edit your swagger spec file with your favorite editor and preview it in a brower!

Usage
-----

Consider `/path/to/spec-file/` is the directory you put the swagger spec file.

The swagger spec file must be named `swagger.yaml` .

Run the following command:

```
docker run --rm -it -v /path/to/spec-file:/runtime/dist/spec-files -p 3000:3000 yewton/swagger-pseudo-live-preview
```

Then go to `http://<DOCKER_HOST>:3000` and you can see the preview of your spec file!

