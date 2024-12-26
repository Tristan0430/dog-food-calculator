export async function onRequestPost(context) {
  try {
    const { weight, coefficient, foodME } = await context.request.json();

    if (
      typeof weight !== 'number' || weight <= 0 ||
      typeof coefficient !== 'number' || coefficient <= 0 ||
      typeof foodME !== 'number' || foodME <= 0
    ) {
      return new Response(
        JSON.stringify({ error: '请提供有效的体重、喂食系数和食物代谢能值！' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const RER = Math.pow(weight, 0.75) * 70;
    const DER = coefficient * RER;
    const foodAmount = (DER / foodME) * 1000;

    return new Response(
      JSON.stringify({ foodAmount }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
		  'Access-Control-Allow-Methods': 'POST, OPTIONS', // 允许的请求方法
	      'Access-Control-Allow-Headers': 'Content-Type',  // 允许的请求头
        }
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: '请求解析失败或服务器内部错误' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
