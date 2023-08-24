export interface Transformation<
  TBlueprint extends new (
    ...args: ConstructorParameters<TBlueprint>
  ) => InstanceType<TBlueprint>,
> {
  (instance: InstanceType<TBlueprint>): unknown;
}

export interface TransformationRegistrar<
  TBlueprint extends new (
    ...args: ConstructorParameters<TBlueprint>
  ) => InstanceType<TBlueprint>,
> {
  (instance: TBlueprint, transformer: Transformation<TBlueprint>): void;
}

export interface RegisterTransformations<
  TBlueprint extends new (
    ...args: ConstructorParameters<TBlueprint>
  ) => InstanceType<TBlueprint>,
> {
  (transformation: TransformationRegistrar<TBlueprint>):
    | Transformation<TBlueprint>
    | undefined
    | void;
}

export function createAdapter<
  TBlueprint extends new (
    ...args: ConstructorParameters<TBlueprint>
  ) => InstanceType<TBlueprint>,
>(transformations: RegisterTransformations<TBlueprint>) {
  const registeredTransformations: RegisteredTransformation<TBlueprint>[] = [];

  const registerTransformation: TransformationRegistrar<TBlueprint> = (
    instance,
    transformation,
  ) => {
    registeredTransformations.push({ instance, transformation });
  };

  const defaultTransformation =
    transformations(registerTransformation) ?? (() => {});

  return function applyTransformation(baseInstance: InstanceType<TBlueprint>) {
    const wantedTransformation = registeredTransformations.find(
      (transformation) => baseInstance instanceof transformation.instance,
    );

    const transformation =
      wantedTransformation?.transformation ?? defaultTransformation;

    transformation(baseInstance);
  };
}

interface RegisteredTransformation<
  TBlueprint extends new (
    ...args: ConstructorParameters<TBlueprint>
  ) => InstanceType<TBlueprint>,
> {
  instance: TBlueprint;
  transformation: Transformation<TBlueprint>;
}
