module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",

    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "env" : {
      "browser": true
    },
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "jsx-a11y/no-static-element-interactions": [
        "off",
        {
          handlers: [
            "onClick",
          ],
        },
      ],
    },

};
