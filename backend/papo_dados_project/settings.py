import os
from pathlib import Path

os.environ['TNS_ADMIN'] = '/opt/oracle/wallet'

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-2*%b(9+^k7)+a)xthjapj94&afm#ox0k547+%iilxp4+f9-sg-"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "core",
    ]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    ]

ROOT_URLCONF = "papo_dados_project.urls"

TEMPLATES = [
   {
   "BACKEND": "django.template.backends.django.DjangoTemplates",
   "DIRS": [],
   "APP_DIRS": True,
   "OPTIONS": {
      "context_processors": [
         "django.template.context_processors.request",
         "django.contrib.auth.context_processors.auth",
         "django.contrib.messages.context_processors.messages",
                            ],
            },
    },
]

WSGI_APPLICATION = "papo_dados_project.wsgi.application"

# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
   "default": {
      "ENGINE": "django.db.backends.oracle",
      "NAME": "cdkteckdb_medium",
      "USER": "ADMIN",
      "PASSWORD": "Potter***111",
      "HOST": "adb.sa-saopaulo-1.oraclecloud.com",
      "PORT": "1522",
                }
            }

# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME":
        "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
        },
    {
        "NAME":
        "django.contrib.auth.password_validation.MinimumLengthValidator",
        },
    {
        "NAME":
        "django.contrib.auth.password_validation.CommonPasswordValidator",
        },
    {
        "NAME":
        "django.contrib.auth.password_validation.NumericPasswordValidator",
        },
    ]

# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"