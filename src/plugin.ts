type NextJsWebpackConfig = (config: any, context: any) => any;

export default function NextWorkerPlugin(callback: NextJsWebpackConfig | undefined) {
  return (config, context) => {
    config.module.rules.push({
      test: /\.worker\.js$/,
      use: [{ loader: 'next-worker/build/loader' }]
    });

    if ( callback ) {
      config = callback(config, context);
    }

    return config;
  }
}