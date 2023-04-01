import requests

def send_request_to_api(api_key, text):
    completions_endpoint = 'https://api.openai.com/v1/chat/completions'
    post_data = {
        'model': 'gpt-3.5-turbo',
        'messages': [{'role': 'user', 'content': text}]
    }
    headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {api_key}'}
    try:
        r = requests.post(completions_endpoint, json=post_data, headers=headers)
        return r.json()
    except requests.exceptions.RequestException:
        return None

def get_choices_text_from_api(choices):
    choices_text = []
    if not choices or not isinstance(choices, list) or len(choices) == 0:
        return choices_text
    for choice in choices:
        message = choice.get('message')
        content = message.get('content') if message and message.get('content') else ''
        choices_text.append(content)
    return choices_text
