import logging
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .governance import log_inference_cost
from .memory_tiering import get_semantic_summary

logger = logging.getLogger(__name__)

@csrf_exempt
@require_POST
def semantic_query(request):
    trace_id = request.headers.get('X-Federation-Trace-Id', 'unknown')
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return JsonResponse({'error': 'Unauthorized'}, status=401)
    
    tenant_id = request.headers.get('X-Tenant-ID')
    if not tenant_id:
        return JsonResponse({'error': 'Unauthorized'}, status=401)

    try:
        payload = json.loads(request.body)
        intent_query = payload.get('query')
        
        logger.info(f"Trace {trace_id} | Processing semantic query for {tenant_id}")
        
        cognitive_data = get_semantic_summary(tenant_id, intent_query)

        log_inference_cost(tenant_id, 'semantic_query', 150, 200)

        return JsonResponse({
            'status': 'success',
            'tenant_id': tenant_id,
            'cognitive_summary': cognitive_data['summary'],
            'evidence_pointers': cognitive_data['evidence_pointers'],
            'confidence_score': cognitive_data['confidence_score'],
            'compression_ratio': cognitive_data['compression_ratio'],
            'trace_id': trace_id
        })

    except Exception as e:
        logger.error(f"Trace {trace_id} | Error: {str(e)}")
        return JsonResponse({'error': 'Internal Server Error'}, status=500)
