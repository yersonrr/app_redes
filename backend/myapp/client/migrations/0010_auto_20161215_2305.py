# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2016-12-15 23:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0009_auto_20161215_2208'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='client',
            name='id',
        ),
        migrations.AlterField(
            model_name='client',
            name='nickname',
            field=models.CharField(max_length=200, primary_key=True, serialize=False, verbose_name='Nickname'),
        ),
    ]