from slowapi import Limiter
from starlette.requests import Request


def get_real_ip(request: Request) -> str:
    """
    Récupère la vraie IP du client.
    Cloudflare injecte CF-Connecting-IP qui ne peut pas être falsifié.
    """
    cf_ip = request.headers.get("CF-Connecting-IP")
    if cf_ip:
        return cf_ip
    real_ip = request.headers.get("X-Real-IP")
    if real_ip:
        return real_ip
    # Dernier recours : première IP de X-Forwarded-For (non fiable seul)
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


limiter = Limiter(key_func=get_real_ip)
