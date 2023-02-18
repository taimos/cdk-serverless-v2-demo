export async function handler(event: AWSLambda.PreTokenGenerationTriggerEvent): Promise<AWSLambda.PreTokenGenerationTriggerEvent> {
  console.log(JSON.stringify(event));

  // modify event.response here ...

  return event;
}