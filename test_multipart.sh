curl -X POST https://n8n-n8n.bdfx4m.easypanel.host/webhook-test/bello-mercado-checkout \
  -F 'event=checkout_initiated' \
  -F 'customer={"name":"mauricio"}' \
  -F 'total=1330'
