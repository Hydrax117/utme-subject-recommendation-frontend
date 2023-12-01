declare module "ml-knn" {
  class knn {
    constructor(options?: { k?: number; distanceFunction?: string });

    train(trainingSet: any[], trainingLabels: any[]): void;

    predict(testSet: any[], k?: number, callback?: Function): any[];
  }

  export = knn;
}
